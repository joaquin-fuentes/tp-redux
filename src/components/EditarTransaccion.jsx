import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { AiTwotoneEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { actualizarTransaccion } from '../slices/transaccionesSlice';

const EditarTransaccion = ({ transaccion }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        setValue("id", transaccion.id);
        setValue("descripcion", transaccion.descripcion);
        setValue("monto", transaccion.monto);
        setValue("categoria", transaccion.categoria);
        setValue("tipo", transaccion.tipo);
        setValue("fecha", transaccion.fecha);
    }, []);

    const onSubmit = (formData) => {
        const datosCompletos = { ...formData }
        dispatch(actualizarTransaccion(datosCompletos))
        reset()
        handleClose()

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Transaccion actualizada correctamente",
            showConfirmButton: false,
            timer: 1500
        });
    }

    return (
        <>
            <button className="btn btn-warning btn-sm m-1" onClick={handleShow}>
                <AiTwotoneEdit />
            </button>
            <Modal show={show} onHide={handleClose} className='p-4'>
                <h2 className='text-center my-5'>Editar Transacción</h2>
                <form className=' m-auto border rounded p-5 mb-5 w-75' onSubmit={handleSubmit(onSubmit)}>
                    <div className='row d-flex flex-column align-items-center'>
                        <div className='col-12'>
                            <label className="form-label" htmlFor="descripcion">Descripcion</label>
                            <input type="text" className={`form-control  ${errors.descripcion ? 'is-invalid' : ''}`}
                                id='descripccion' name='descripcion' placeholder='Ingrese descripcion de la transacción'  {...register('descripcion', {
                                    required: "La descripcion es obligatoria",
                                    maxLength: {
                                        value: 250,
                                        message: "La descripcion debe contener como maximo 250 caracteres",
                                    },
                                })} />
                            <p className='text-danger'>{errors.descripcion?.message}</p>
                        </div>
                        <div className='col-12'>
                            <label className="form-label" htmlFor="monto">Monto</label>
                            <input type="number" className={`form-control  ${errors.monto ? 'is-invalid' : ''}`}
                                id='monto' name='monto' placeholder='Ingrese el monto de la transaccion'  {...register('monto', {
                                    required: "El monto es obligatorio",
                                    min: {
                                        value: 1,
                                        message: "Debe ingresar un monto mayor que 0",
                                    },
                                })} />
                            <p className='text-danger'>{errors.monto?.message}</p>
                        </div>
                        <div className='col-12'>
                            <label className="form-label" htmlFor="categoria" >Categoria</label>
                            <select
                                className={`form-control  ${errors.categoria ? 'is-invalid' : ''}`}
                                id="categoria" name='categoria'
                                {...register("categoria", { required: "La categoria es obligatoria" })}
                            >
                                <option value="">Seleccione una categoria</option>
                                <option value="servicios" >Servicios </option>
                                <option value="entretenimiento">Entretenimientos</option>
                                <option value="comida" >Comida</option>
                                <option value="sueldo" >Sueldo</option>
                                <option value="alquiler" >Alquiler</option>
                                <option value="prestamos" >Prestamo</option>
                                <option value="otros" >Otro</option>
                            </select>
                            <p className='text-danger'>{errors.categoria?.message}</p>
                        </div>
                        <div className='col-12'>
                            <label className="form-label" htmlFor="tipo" >Tipo</label>
                            <select
                                className={`form-control  ${errors.tipo ? 'is-invalid' : ''}`}
                                id="tipo" name='tipo'
                                {...register("tipo", { required: "El tipo de transaccion es obligatorio" })}
                            >
                                <option value="">Seleccione un tipo</option>
                                <option value="ingreso" >Ingreso </option>
                                <option value="egreso">Egresos</option>
                            </select>
                            <p className='text-danger'>{errors.tipo?.message}</p>
                        </div>
                        <div className='col-12'>
                            <label className="form-label" htmlFor="fecha">Fecha</label>
                            <input type="text" disabled className={`form-control  ${errors.fecha ? 'is-invalid' : ''}`}
                                id='descripccion' name='fecha' placeholder='Ingrese fecha de la transacción'  {...register('fecha', {
                                    required: "La fecha es obligatoria",
                                    maxLength: {
                                        value: 250,
                                        message: "La fecha debe contener como maximo 250 caracteres",
                                    },
                                })} />
                            <p className='text-danger'>{errors.descripcion?.message}</p>
                        </div>
                        <div className='col-12'>
                            <label className="form-label" htmlFor="id">ID:</label>
                            <input type="text" disabled className={`form-control  ${errors.id ? 'is-invalid' : ''}`}
                                id='descripccion' name='id' placeholder='Ingrese id de la transacción'  {...register('id', {
                                    required: "La id es obligatoria",
                                    maxLength: {
                                        value: 250,
                                        message: "La id debe contener como maximo 250 caracteres",
                                    },
                                })} />
                            <p className='text-danger'>{errors.descripcion?.message}</p>
                        </div>

                        <button type='submit' className=' w-50 btn btn-primary  mt-4 mx-0'>Editar</button>
                        <button type='reset' onClick={() => handleClose()} className=' w-50 btn btn-outline-danger  mt-4 mx-0'>Cancelar</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default EditarTransaccion;