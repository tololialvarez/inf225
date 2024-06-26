import React, {useState, useEffect} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button, Alert }from 'react-bootstrap';
import PropTypes from 'prop-types';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function formatDate(dateString) {
  const fecha = new Date(dateString);
  const año = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const dia = fecha.getDate().toString().padStart(2, '0');
  return `${año}-${mes}-${dia}`;
}

function showDecimal(number){
  let formatter = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let result = formatter.format(number);
  return result;
}

function Solicitudes({handleLinkClick}) {
  const [tasa, setTasa] = useState("");
  const [valor_credito, setvalor_credito] = useState("");
  const [plazo, setPlazo] = useState("");
  const [rut, setRut] = useState("");
  const [estado, setEstado] = useState("");
  const [prestamo, setPrestamo] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleTasa = (e) => setTasa(e.target.value);
  const handleValorCred = (e) => setvalor_credito(e.target.value);
  const handleRut = (e) => setRut(e.target.value);
  const handlePlazo = (e) => setPlazo(e.target.value);

  useEffect(()=> {
    const user=JSON.parse(localStorage.getItem('user'));
    if (!user){
      handleLinkClick('login')
    }
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const user=JSON.parse(localStorage.getItem('user'));
    console.log(user);
    axios
      .post(`${backendUrl}/solicitudes/generar`,{
        tasa:tasa,
        valor_credito:valor_credito,
        plazo:plazo,
        rut_cliente:user.rut,
      })
      .then((response) => {
        setEstado("OK");
        setShowAlert(true);
        setPrestamo(response.data);
      })
      .catch((error) => {
            if (error.response) {
              // El servidor respondió con un código de error
              setEstado(`Error: ${error.response.data.error}`);
          } else if (error.request) {
              // La solicitud fue realizada, pero no se recibió respuesta
              setEstado("No se recibió respuesta del servidor");
          } else {
              // Se produjo un error antes de realizar la solicitud
              setEstado("Error desconocido al realizar la solicitud");
          }
          });
  };

  return (
    <Form>
      {estado !== "" && (
        /*<Alert variant={estado === "OK" ? "success" : "danger"}>
          {estado}
        </Alert>*/
        estado === "OK" ? (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Éxito</Alert.Heading>
          <p>Los datos se enviaron con éxito:</p>
          <p>Rut cliente: {prestamo.rut_cliente}</p>
          <p>Valor UF: {prestamo.valor_uf}</p>
          <p>Tasa: {prestamo.tasa}</p>
          <p>Plazo: {prestamo.plazo}</p>
          <p>Valor crédito: {prestamo.valor_credito}</p>
          <p>Cuota UF: {showDecimal(prestamo.cuota_uf)}</p>
          <p>Total: {showDecimal(prestamo.total)}</p>
          <p>Fecha de solicitud: {formatDate(prestamo.createdAt)}</p>
        </Alert>) : (
          <Alert variant="danger">
          {estado}
        </Alert>
        )
        
      )}

      <Form.Group className="mb-3" controlId="formNombre">
        <Form.Label>Tasa mensual</Form.Label>
        <Form.Control onChange={handleTasa} type="text" placeholder="Ingrese la tasa" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formplazo">
        <Form.Label>Plazo</Form.Label>
        <Form.Control onChange={handlePlazo} type="text" placeholder="Ingrese plazo" />
        </Form.Group>

      <Form.Group className="mb-3" controlId="formd">
        <Form.Label>Valor crédito</Form.Label>
        <Form.Control onChange={handleValorCred} type="text" placeholder="Ingrese el valor del crédito" />
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit">
        Enviar Solicitud
      </Button>
    </Form>
  );
}

Solicitudes.propTypes = {
  handleLinkClick: PropTypes.func
};

Solicitudes.defaultProps = {
  handleLinkClick: () => {}
};

export default Solicitudes;