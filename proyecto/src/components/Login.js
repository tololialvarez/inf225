import React, {useState, useEffect} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button, Alert }from 'react-bootstrap';
import { UseSelector, useDispatch } from "react-redux";
import {login, logout} from "../redux/actions/authActions"
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Login() {
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
        axios
          .post(`${backendUrl}/auth/login`, {
            email: email,
            password: password,
          })
          .then((response) => {
            localStorage.setItem("authToken", response.headers.get('auth-token'));
            localStorage.setItem('user', JSON.stringify(response.data.user));
            dispatch(login());
            setEstado(response.data.message);
            console.log(response.data);
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
        <Alert variant={estado === "Login exitoso" ? "success" : "danger"}>
          {estado}
        </Alert>
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleEmail} type="email" placeholder="Enter email" />                <Form.Text className="text-muted">
            We'll never share your email with anyone else.
        </Form.Text>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handlePass} type="password" placeholder="Password" />
      </Form.Group>
      
      <Button onClick={handleSubmit} variant="primary" type="submit">
            Submit
          </Button>
    </Form>
  );
}

export default Login;