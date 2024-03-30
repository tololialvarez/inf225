import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import './Clientes.css';
import SearchBar from './SearchBar'; 
import {useSelector} from "react-redux";
import { Alert } from "react-bootstrap";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Clientes() {
    const [ListofClients, setListofClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    let esVendedor = false; // Inicializa esVendedor como false por defecto

    if (isLogged) {
    // Solo intenta obtener esVendedor si el usuario está autenticado
    esVendedor = JSON.parse(localStorage.getItem('user')).esVendedor;
    }

    useEffect(() => {
        try {
            axios.get(`${backendUrl}/users`).then((response) => {
                setListofClients(response.data);
                setFilteredClients(response.data)
            });
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    }, []);

    const handleSearch = async (query) => {
        try {
          const response = await axios.get(`${backendUrl}/users/${query}`);
          setFilteredClients(response.data);
        } catch (error) {
          console.error('Error searching clients:', error);
        }
      };
    
    const handleClear = () => {
        setFilteredClients(ListofClients); // Reset to show all clients
    };

    return isLogged ? (
        esVendedor ? (
        <div className="App">
            <div className="background-pink"> {/* Aplicamos el fondo rosa pastel aquí */}
            <SearchBar onSearch={handleSearch} onClear={handleClear} />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="kawaii-cell">Rut</th>
                            <th className="kawaii-cell">Nombre</th>
                            <th className="kawaii-cell">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map((value, key) => {
                            return (
                                <tr key={key}>
                                    <td className="kawaii-cell">{value.rut}</td>
                                    <td className="kawaii-cell">{value.nombre}</td>
                                    <td className="kawaii-cell">{value.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
        ) : (
            <Alert variant="danger" >
          Usuario no autorizado
        </Alert>
        )
    ) : (
        <Alert variant="danger" >
          Debe iniciar sesión!
        </Alert>
    );
}

export default Clientes;
