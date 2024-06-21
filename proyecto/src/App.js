import './App.css';
import Inicio from './components/inicio';
import ValorUF from './components/valorUF';
import Clientes from './components/Clientes';
import Login from './components/Login';
import Register from './components/Register';
import Solicitudes from './components/Solicitudes';
import Prestamos from './components/Prestamos';
import QuotationsPage from './components/QuotationsPage';
import { logout} from "./redux/actions/authActions"
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Nav, NavDropdown, Navbar, Form, InputGroup} from "react-bootstrap"
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";

const App = () => {
  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [dataUser, setDataUser] = useState({});
  const isLogged = useSelector((store) => store.authReducer.isLogged);

  useEffect(() => {
    window.onpopstate = () => {
      setCurrentPage(getInitialPage());
    };
  }, []);

  useEffect(() => {
    const user=JSON.parse(localStorage.getItem('user'));
    console.log(user);
    setDataUser(user || {});
  }, [isLogged]);

  function getInitialPage() {
    const path = window.location.pathname;
    if (path === '/inicio') return 'inicio';
    if (path === '/register') return 'register';
    if (path === '/clientes') return 'clientes';
    if (path === '/valoruf') return 'valoruf';
    if (path === '/solicitudes') return 'solicitudes';
    if (path === '/prestamos') return 'prestamos';
    if (path.includes('/quotations')) return 'quotations'; 

    return 'login';
  }
  const dispatch = useDispatch();

  const handleLogout = (e)=>{
    dispatch(logout()); localStorage.clear();
    handleLinkClick('login');
  }
  const handleLinkClick = (page) => {
    setCurrentPage(page);
    window.history.pushState(null, null, `/${page}`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'register':
        return <Register handleLinkClick={handleLinkClick} />;
      case 'login':
        return <Login handleLinkClick={handleLinkClick} />;
      case 'inicio':
        return <Inicio />;
      case 'clientes':
        return <Clientes />;
      case 'valoruf':
        return <ValorUF />;
      case 'solicitudes':
        return <Solicitudes handleLinkClick={handleLinkClick} />;
      case 'prestamos':
        return <Prestamos />;
      case 'quotations':
        const customerId = window.location.pathname.split('/')[2];  // assuming URL like /quotations/123
        return <QuotationsPage customerId={customerId} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>La Clave</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => handleLinkClick('inicio')}>Inicio</Nav.Link>
              {isLogged && dataUser.esVendedor && <Nav.Link onClick={() => handleLinkClick('clientes')}>Clientes</Nav.Link>}
              {isLogged && dataUser.esVendedor && <Nav.Link onClick={() => handleLinkClick('prestamos')}>Ver Solicitudes</Nav.Link>}
              <Nav.Link onClick={() => handleLinkClick('valoruf')}>Valor UF</Nav.Link>
              <Nav.Link onClick={() => handleLinkClick('quotations')}>Simulación</Nav.Link>
            </Nav>
            <NavDropdown title="Menú" id="basic-nav-dropdown">
                {!isLogged &&<NavDropdown.Item onClick={() => handleLinkClick('login')}>Login</NavDropdown.Item>}
                {!isLogged &&<NavDropdown.Item onClick={() => handleLinkClick('register')}>Register</NavDropdown.Item>}
                {isLogged && !dataUser.esVendedor && <NavDropdown.Item onClick={() => handleLinkClick('solicitudes')}>Generar Solicitudes</NavDropdown.Item>}
                {isLogged && <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>}
            </NavDropdown>
          </Navbar.Collapse>
          <p className='username-logged'>{isLogged&& dataUser.nombre}</p>
        </Container>
      </Navbar>

      <Container className="mt-3">{renderPage()}</Container>
      
    </div>
  );
};
export default App;
