import React, { useState } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ItemTransResumen from '../components/ItemTransResumen';

const Resumen = () => {
    const listaTransacciones = useSelector((state) => state.transacciones);
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    const handleFechaDesdeChange = (e) => {
        setFechaDesde(e.target.value);
    };

    const handleFechaHastaChange = (e) => {
        setFechaHasta(e.target.value);
    };

    const convertirFecha = (fecha) => {
        const [dia, mes, año] = fecha.split('/');
        return new Date(`${año}-${mes}-${dia}`);
    };

    const transaccionesFiltradas = listaTransacciones.filter((transaccion) => {
        const fechaTransaccion = convertirFecha(transaccion.fecha);
        const desde = fechaDesde ? new Date(fechaDesde) : new Date('1900-01-01');
        const hasta = fechaHasta ? new Date(fechaHasta) : new Date();
        return fechaTransaccion >= desde && fechaTransaccion <= hasta;
    });

    const totalIngresos = transaccionesFiltradas
        .filter(transaccion => transaccion.tipo === 'ingreso')
        .reduce((acc, transaccion) => acc + parseFloat(transaccion.monto), 0);

    const totalEgresos = transaccionesFiltradas
        .filter(transaccion => transaccion.tipo === 'egreso')
        .reduce((acc, transaccion) => acc + parseFloat(transaccion.monto), 0);

    const saldo = totalIngresos - totalEgresos;

    return (
        <Container>
            <h2 className='text-center mt-3'>Resumen de Cuenta</h2>
            <hr />
            <section className='row'>
                <div className='col-6'>
                    <label className="form-label">Desde:</label>
                    <input type="date" className="form-control" value={fechaDesde} onChange={handleFechaDesdeChange} />
                </div>
                <div className='col-6'>
                    <label className="form-label">Hasta:</label>
                    <input type="date" className="form-control" value={fechaHasta} onChange={handleFechaHastaChange} />
                </div>
            </section>
            {transaccionesFiltradas.length === 0 ? (
                <Alert variant="warning" className='mt-3'>
                    No hay transacciones con los filtros solicitados
                </Alert>
            ) : (
                <div className="table-responsive tabla-scrollable-resumen mt-3 mb-2">
                    <Table striped bordered hover variant="dark">
                        <thead className='text-center'>
                            <tr>
                                <th>Descripción</th>
                                <th>Monto</th>
                                <th>Categoría</th>
                                <th>Tipo</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {transaccionesFiltradas.map((transaccion) => (
                                <ItemTransResumen key={transaccion.id} transaccion={transaccion} />
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
            <section className='row mb-3'>
                <div className="col-4">
                    <div className='card p-3 d-flex flex-column justify-content-center align-items-center border-success'>
                        <p className="text-success fw-bold">Total Ingresos</p>
                        <p className='text-success fw-bold'>${totalIngresos}</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className='card p-3 d-flex flex-column justify-content-center align-items-center border-danger'>
                        <p className="text-danger fw-bold">Total Egresos</p>
                        <p className='text-danger fw-bold'>${totalEgresos}</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className='card p-3 d-flex flex-column justify-content-center align-items-center border-primary'>
                        <p className="text-primary fw-bold">Saldo</p>
                        <p className='text-primary fw-bold'>${saldo}</p>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default Resumen;
