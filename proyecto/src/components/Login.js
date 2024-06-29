import React, {useState, useEffect} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button, Alert }from 'react-bootstrap';
import { UseSelector, useDispatch } from "react-redux";
import {login, logout} from "../redux/actions/authActions"
import PropTypes from 'prop-types';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Login({handleLinkClick}) {
    const [email, setEmail] = useState("");
    const [password, setPass]= useState("");
    const [estado, setEstado]= useState("");
    const dispatch = useDispatch();
    const [token, setToken] = useState("");

    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handlePass = (e)=>{
        setPass(e.target.value);
    }
   
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password){
        axios
          .post(`${backendUrl}/auth/login`, {
            email: email,
            password: password,
          })
          .then((response) => {
            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            dispatch(login());
            setEstado(response.data.message);
            handleLinkClick('inicio');
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
        } else {
          setEstado("Debe ingresar email y/o password");
        }
      };
  return (
    <Form>
      {estado !== "" && (
        <Alert variant={estado === "Login exitoso" ? "success" : "danger"}>
          {estado}
        </Alert>
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control onChange={handleEmail} type="email" placeholder="Introduzca su correo electrónico" />                
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control onChange={handlePass} type="password" placeholder="Introduzca su contraseña" />
      </Form.Group>
      
      <Button onClick={handleSubmit} variant="primary" type="submit">
            Iniciar Sesión
          </Button>
    </Form>
  );
}
Login.propTypes = {
  handleLinkClick: PropTypes.func
};

Login.defaultProps = {
  handleLinkClick: () => {}
};

export default Login;