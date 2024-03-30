import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import './Clientes.css';
import {useSelector} from "react-redux";
import { Alert } from "react-bootstrap";
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

function Prestamos() {
    const [ListofPrestamos, setListofPrestamos] = useState([]);
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    
    useEffect(() => {
        try {
            const user=localStorage.getItem("user");
            axios.get(`${backendUrl}/solicitudes/ver`,{
                params: {
                    user: user,
                },
            }).then((response) => {
                setListofPrestamos(response.data);
            });
        } catch (error) {
            console.error("Error fetching prestamos:", error);
        }
    }, []);

    return isLogged ? (
        <div className="App">
          <div className="background-pink">
            {ListofPrestamos.length === 0 ? (
              <Alert variant="light">
                No hay prestamos para mostrar
              </Alert>
            ) : (
              // Renderizar la tabla aquí
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="kawaii-cell">Rut cliente</th>
                    <th className="kawaii-cell">Valor UF</th>
                    <th className="kawaii-cell">Tasa</th>
                    <th className="kawaii-cell">Plazo</th>
                    <th className="kawaii-cell">Valor crédito</th>
                    <th className="kawaii-cell">Cuota UF</th>
                    <th className="kawaii-cell">Total</th>
                    <th className="kawaii-cell">Fecha de solicitud</th>
                  </tr>
                </thead>
                <tbody>
                  {ListofPrestamos.map((value, key) => (
                    <tr key={key}>
                      <td className="kawaii-cell">{value.rut_cliente}</td>
                      <td className="kawaii-cell">{value.valor_uf}</td>
                      <td className="kawaii-cell">{value.tasa}</td>
                      <td className="kawaii-cell">{value.plazo}</td>
                      <td className="kawaii-cell">{value.valor_credito}</td>
                      <td className="kawaii-cell">{showDecimal(value.cuota_uf)}</td>
                      <td className="kawaii-cell">{showDecimal(value.total)}</td>
                      <td className="kawaii-cell">{formatDate(value.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      ) : (
        <Alert variant="danger">
          Debe iniciar sesión!
        </Alert>
      );      
}

export default Prestamos;
