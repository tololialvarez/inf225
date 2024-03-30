import React, { useState } from "react";
import axios from "axios";
import { Button, Form, InputGroup, Alert } from "react-bootstrap";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [esVendedor, setEsVendedor] = useState(false);
  const [estado, setEstado] = useState("");

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRut = (e) => setRut(e.target.value);
  const handleNombre = (e) => setNombre(e.target.value);
  const handleEsVendedor = (e) => setEsVendedor(e.target.checked);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${backendUrl}/auth/register`, {
        email: email,
        password: password,
        rut: rut, // Aquí debes unir el número de RUT y el dígito verificador antes de enviarlo al servidor
        esVendedor: esVendedor,
        nombre: nombre,
      })
      .then((response) => {
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
        <Alert variant={estado === "Registro exitoso" ? "success" : "danger"}>
          {estado}
        </Alert>
      )}

      <Form.Group className="mb-3" controlId="formNombre">
        <Form.Label>Ingrese su nombre</Form.Label>
        <Form.Control onChange={handleNombre} type="text" placeholder="Nombre" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formRut">
        <Form.Label>Ingrese su RUT (sin dígito verificador)</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control onChange={handleRut} type="text" placeholder="RUT" />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={handleEmail} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handlePassword} type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group controlId="formEsVendedor">
        <Form.Check
          type="switch"
          label="Es vendedor?"
          checked={esVendedor}
          onChange={handleEsVendedor}
        />
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Register;
