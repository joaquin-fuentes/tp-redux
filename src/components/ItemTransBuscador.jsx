import React from 'react';

const ItemTransBuscador = ({transaccion}) => {
    return (
        <tr>
            <td>{transaccion.descripcion}</td>
            <td>$ {transaccion.monto}</td>
            <td>{transaccion.categoria}</td>
            <td>{transaccion.tipo}</td>
            <td>{transaccion.fecha}</td>
        </tr>
    );
};

export default ItemTransBuscador;