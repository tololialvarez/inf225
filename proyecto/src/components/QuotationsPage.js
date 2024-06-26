import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formateaRut, checkRut, formatAmount } from '../utils/format';
import { Alert } from "react-bootstrap";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const QuotationsPage = () => {
  const [rut, setRut] = useState('');
  const [valorUF, setValorUF] = useState(null);
  const [montoUF, setMontoUF] = useState('');
  const [meses, setMeses] = useState('');
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [historialRut, setHistorialRut] = useState('');
  const [errorValidacion, setErrorValidacion] = useState('');
  const [errorValidacionHistorial, setErrorValidacionHistorial] = useState('');

  const fetchUF = async () => {
    try {
      const APIkey = "b022097785bd0cdef5584ef20e77d252876995ea";
      const response = await axios.get(`https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=${APIkey}&formato=json`);
      const data = response.data;
      const ufValue = parseFloat(data.UFs[0].Valor.replace('.', '').replace(',', '.'));
      setValorUF(ufValue);
    } catch (error) {
      console.error("Error fetching UF value:", error);
    }
  };

  useEffect(() => {
    fetchUF();
  }, []);

  const handleRut = (value, historial) => {
    const rut = formateaRut(value);
    if (historial) {
      setHistorialRut(rut);
    } else {
      setRut(rut);
    }
  }

  const calcularPagoMensual = (montoUF, tasaAnual, meses) => {
    const tasaMensual = tasaAnual / 12 / 100;
    const pagoMensual = (montoUF * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));
    return pagoMensual;
  };

  const handleCalcular =  () => {
    if (checkRut(rut)) {
      setErrorValidacion("");
      const [rutForm, dv] = rut.replaceAll('.', '').split('-');
      const tasaAnual = 2; // Fixed annual interest rate of 2%
      const pagoMensualUF = calcularPagoMensual(parseFloat(montoUF), tasaAnual, parseInt(meses));
      const pagoMensualCLP = pagoMensualUF * valorUF;
      setResultado(pagoMensualCLP.toFixed(2));

      try {
        axios.post(`${backendUrl}/simulations/save`, {
          rut: rutForm,
          monto_uf: parseFloat(montoUF),
          meses: parseInt(meses),
          resultado: parseFloat(pagoMensualCLP),
        }).catch(() => {
          setErrorValidacion("Error al guardar simulación");
        });
        
      } catch (error) {
        setErrorValidacion("Error al calcular");
      }
    } else {
      setErrorValidacion("Rut Inválido");
    }
  };

  const fetchHistorial = () => {
    if (checkRut(historialRut)) {
      setErrorValidacionHistorial("");
      const [rutForm, dv] = historialRut.replaceAll('.', '').split('-');
      try {
        axios.get(`${backendUrl}/simulations/${rutForm}`).then((response) => {
          setHistorial(response.data);
        }).catch(() => setErrorValidacionHistorial("Error al buscar información"));
      } catch (error) {
        setErrorValidacionHistorial("Error al buscar información");
      }
    } else {
      setErrorValidacionHistorial("Rut Inválido");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Simulación</h1>
      {errorValidacion !== "" && (
        <Alert variant={errorValidacion === "Registro exitoso" ? "success" : "danger"}>
          {errorValidacion}
        </Alert>
      )}
      <div style={styles.formGroup}>
        <label style={styles.label}>RUT: </label>
        <input 
          type="text" 
          value={rut} 
          onChange={(e) => handleRut(e.target.value, false)} 
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Número de UF: </label>
        <input 
          type="number" 
          value={montoUF} 
          onChange={(e) => setMontoUF(e.target.value)} 
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Número de meses: </label>
        <input 
          type="number" 
          value={meses} 
          onChange={(e) => setMeses(e.target.value)} 
          style={styles.input}
        />
      </div>
      <button onClick={handleCalcular} disabled={!valorUF || !montoUF || !meses || !rut} style={styles.button}>Calcular y guardar</button>
      {resultado && (
        <div style={styles.result}>
          <h3 style={styles.resultHeader}>Resultado de la simulación:</h3>
          <p style={styles.resultText}>Pago mensual en pesos chilenos: {formatAmount(resultado)}</p>
        </div>
      )}
      {!valorUF && <p style={styles.loadingText}>Loading UF value...</p>}
      <br />
      <br />
      <h2 style={styles.header}>Historial de Cotizaciones</h2>
      {errorValidacionHistorial !== "" && (
        <Alert variant={errorValidacionHistorial === "Registro exitoso" ? "success" : "danger"}>
          {errorValidacionHistorial}
        </Alert>
      )}
      <div style={styles.formGroup}>
        <label style={styles.label}>RUT para historial: </label>
        <input 
          type="text" 
          value={historialRut} 
          onChange={(e) => handleRut(e.target.value, true)} 
          style={styles.input}
        />
        <button onClick={fetchHistorial} disabled={!historialRut} style={styles.button}>Buscar Historial</button>
      </div>
      <div>
        {historial.length > 0 ? (
          <ul style={styles.list}>
            {historial.map((simulacion, index) => (
              <li key={index} style={styles.listItem}>
                <p style={styles.listText}>Fecha: {new Date(simulacion.fecha).toLocaleDateString()}</p>
                <p style={styles.listText}>Monto UF: {simulacion.monto_uf}</p>
                <p style={styles.listText}>Meses: {simulacion.meses}</p>
                <p style={styles.listText}>Resultado: {formatAmount(simulacion.resultado)} CLP</p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noHistoryText}>No hay cotizaciones previas.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: 'auto',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  header: {
    textAlign: 'center',
    color: '#FF69B4',
    marginBottom: '20px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  button: {
    backgroundColor: '#FF69B4',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'block',
    width: '100%',
    marginTop: '10px'
  },
  buttonDisabled: {
    backgroundColor: '#FFB6C1',
    cursor: 'not-allowed'
  },
  result: {
    backgroundColor: '#FFF0F5',
    padding: '15px',
    borderRadius: '5px',
    marginTop: '20px'
  },
  resultHeader: {
    margin: '0 0 10px 0',
    color: '#FF69B4'
  },
  resultText: {
    margin: '0',
    color: '#555'
  },
  loadingText: {
    textAlign: 'center',
    color: '#999'
  },
  list: {
    listStyleType: 'none',
    padding: '0'
  },
  listItem: {
    backgroundColor: '#FFF0F5',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px'
  },
  listText: {
    margin: '0',
    color: '#555'
  },
  noHistoryText: {
    textAlign: 'center',
    color: '#999'
  }
};

export default QuotationsPage;
