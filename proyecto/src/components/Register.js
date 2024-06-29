import React, { useState } from "react";
import axios from "axios";
import { Button, Form, InputGroup, Alert} from "react-bootstrap";
import { formateaRut, checkRut } from "../utils/format";
import PropTypes from 'prop-types';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Register({handleLinkClick}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [esVendedor, setEsVendedor] = useState(false);
  const [esAnalista, setEsAnalista] = useState(false);
  const [estado, setEstado] = useState("");
  const [selectedOption, setSelectedOption] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleNombre = (e) => setNombre(e.target.value);

  const handleTipoUsuario = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    setEsVendedor(false);
    setEsAnalista(false);
    switch (value) {
      case 'vendedor':
        setEsVendedor(true);
        break;
      case 'analista':
          setEsAnalista(true);
          break;
      default:
        break;

    }
    
  };

  const handleRut = (e) => {
    const rut = formateaRut(e.target.value);
    setRut(rut);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkRut(rut)){
      setEstado("Rut Inválido");
    } else {
      const [rutForm, dv] = rut.replaceAll('.', '').split('-');
      axios
        .post(`${backendUrl}/auth/register`, {
          email: email,
          password: password,
          rut: rutForm, // Aquí debes unir el número de RUT y el dígito verificador antes de enviarlo al servidor
          esVendedor: esVendedor,
          esAnalista: esAnalista,
          nombre: nombre,
        })
        .then((response) => {
          setEstado(response.data.message);
          handleLinkClick('login');
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
    }
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
        <Form.Control onChange={handleNombre} type="text" placeholder="Introduzca su nombre" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formRut">
        <Form.Label>Ingrese su RUT</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control onChange={handleRut} type="text" placeholder="Introduzca su RUT" value={rut} />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control onChange={handleEmail} type="email" placeholder="Introduzca su correo electronico" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control onChange={handlePassword} type="password" placeholder="Introduzca su contraseña" />
      </Form.Group>

    
      <Form.Select onChange={handleTipoUsuario} value={selectedOption}>
      <option value="">Seleccione tipo de usuario</option>
      <option value="cliente">Cliente</option>
      <option value="vendedor">Vendedor</option>
      <option value="analista">Analista</option>
    </Form.Select>
      <Button onClick={handleSubmit} variant="primary" type="submit">
        Registro
      </Button>
    </Form>
  );
}

Register.propTypes = {
  handleLinkClick: PropTypes.func
};

Register.defaultProps = {
  handleLinkClick: () => {}
};

export default Register;
