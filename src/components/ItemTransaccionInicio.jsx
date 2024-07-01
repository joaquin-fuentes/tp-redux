import React from 'react';
import { Button } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditarTransaccion from './EditarTransaccion';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import { eliminarTransaccion } from '../slices/transaccionesSlice';


const ItemTransaccionInicio = ({ transaccion }) => {

    const dispatch = useDispatch()

    const onDelete = (id) => {
        Swal.fire({
            title: "Estás seguro?",
            text: "No podras revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {

                console.log("eliminar" + id)
                dispatch(eliminarTransaccion(id))

                Swal.fire({
                    title: "Eliminado!",
                    text: "La transaccion fue eliminada.",
                    icon: "success"
                });
            }
        });

    }
    return (
        <tr>
            <td>{transaccion.id}</td>
            <td>{transaccion.descripcion}</td>
            <td>$ {transaccion.monto}</td>
            <td>{transaccion.categoria}</td>
            <td>{transaccion.tipo}</td>
            <td>{transaccion.fecha}</td>
            <td className='d-flex justify-content-center'>
                <EditarTransaccion transaccion={transaccion}></EditarTransaccion>
                <Button onClick={() => onDelete(transaccion.id)} className='m-1 d-flex align-items-center justify-content-centerr' variant='danger'> <MdDelete />
                </Button>
            </td>
        </tr>
    );
};

export default ItemTransaccionInicio;