import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navegacion from "../components/Navegacion"
import Inicio from '../pages/Inicio';
import Buscador from '../pages/Buscador';
import Resumen from '../pages/Resumen';
import CrearTransaccion from '../pages/CrearTransaccion';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navegacion></Navegacion>
            <Routes>
                <Route path='/' element={<Inicio></Inicio>}></Route>
                <Route path='/buscar' element={<Buscador></Buscador>}></Route>
                <Route path='/resumen-cuenta' element={<Resumen></Resumen>}></Route>
                <Route path='/crear' element={<CrearTransaccion></CrearTransaccion>}></Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;