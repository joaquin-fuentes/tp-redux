import React, { useState } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ItemTransBuscador from '../components/ItemTransBuscador';

const Buscador = () => {
    const listaTransacciones = useSelector((state) => state.transacciones);
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');

    const handleDescripcionChange = (e) => {
        setDescripcion(e.target.value);
    };

    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value);
    };

    const transaccionesFiltradas = listaTransacciones.filter((transaccion) => {
        const matchDescripcion = transaccion.descripcion.toLowerCase().includes(descripcion.toLowerCase());
        const matchCategoria = categoria === '' || transaccion.categoria === categoria;
        return matchDescripcion && matchCategoria;
    });

    return (
        <Container>
            <h2 className='text-center mt-3'>Buscador de Transacciones</h2>
            <hr />
            <section className='row'>
                <div className="col-6">
                    <label className='form-label'>Buscar por Descripción: </label>
                    <input
                        className='form-control'
                        type="text"
                        placeholder='Buscar transacción por descripción'
                        value={descripcion}
                        onChange={handleDescripcionChange}
                    />
                </div>
                <div className="col-6">
                    <label className='form-label'>Buscar por Categoría: </label>
                    <select
                        className='form-control'
                        value={categoria}
                        onChange={handleCategoriaChange}
                    >
                        <option value="">Seleccione una categoría</option>
                        <option value="">Todos</option>
                        <option value="servicios">Servicios</option>
                        <option value="entretenimiento">Entretenimiento</option>
                        <option value="comida">Comida</option>
                        <option value="alquiler">Alquiler</option>
                        <option value="prestamos">Préstamo</option>
                        <option value="otros">Otro</option>
                    </select>
                </div>
            </section>
            {transaccionesFiltradas.length === 0 ? (
                <Alert variant="warning" className='mt-3'>
                    No hay transacciones con los filtros solicitados
                </Alert>
            ) : (
                <div className="table-responsive tabla-scrollable-buscador mt-3 mb-2">
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
                                <ItemTransBuscador key={transaccion.id} transaccion={transaccion} />
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
};

export default Buscador;
