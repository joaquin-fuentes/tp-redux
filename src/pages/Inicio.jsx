import React from 'react';
import { Container, Button, Table } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';
import ItemTransaccionInicio from '../components/ItemTransaccionInicio';



const Inicio = () => {
    const listaTransacciones = useSelector((state) => state.transacciones);

    return (
        <Container>
            <h2 className='text-center mt-3'>Administrador de Transacciones</h2>
            <hr />
            <Link to={"/crear"} className='btn btn-primary'>Crear Transaccion</Link>
            <div className="table-responsive tabla-scrollable-inicio mt-3 mb-2">
                <Table striped bordered hover variant="dark">                <thead className='text-center'>
                    <tr>
                        <th>#</th>
                        <th>Descripcion</th>
                        <th>Monto</th>
                        <th>Categoria</th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                    <tbody className='text-center'>
                        {
                            listaTransacciones && listaTransacciones.map((transaccion) => {
                                return <ItemTransaccionInicio key={transaccion.id} transaccion={transaccion} ></ItemTransaccionInicio>
                            })
                        }

                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default Inicio;