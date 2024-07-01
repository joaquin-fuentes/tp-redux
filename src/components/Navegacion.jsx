import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap"
import { NavLink } from 'react-router-dom';

const Navegacion = () => {
    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <h2 className='fs-5 text-light'>Registro de transacciones</h2>
                <Nav className="ms-auto">
                    <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : " "} `} to="/">Inicio</NavLink>
                    <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : " "} `} to="/buscar">Buscar</NavLink>
                    <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : " "} `} to="/resumen-cuenta">Resumen cuenta</NavLink>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navegacion;