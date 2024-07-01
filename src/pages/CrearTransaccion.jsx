import React from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { agregarTransaccion } from '../slices/transaccionesSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CrearTransaccion = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const navegacion = useNavigate()
    const dispatch = useDispatch()
    const onSubmit = (formData) => {
        const datosCompletos = { ...formData, fecha: fechaDehoy(), id: generarIdUnico() }
        console.log(datosCompletos)
        dispatch(agregarTransaccion(datosCompletos))
        reset()
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Transaccion creada correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        navegacion("/")

    }

    const fechaDehoy = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const generarIdUnico = () => {
        const timestamp = Date.now(); // Obtiene el número de milisegundos desde el 1 de enero de 1970
        // const randomNum = Math.floor(Math.random() * 1000000); // Genera un número aleatorio entre 0 y 999999
        // return `${timestamp}-${randomNum}`;
        return timestamp
    }

    return (
        <Container>
            <h2 className='text-center my-3'>Crear Transacción</h2>
            <form className=' m-auto border rounded p-5 mb-5 w-50' onSubmit={handleSubmit(onSubmit)}>
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
                    <button type='submit' className=' w-50 btn btn-primary  mt-4 mx-0'>Crear</button>
                    <button type='reset' className=' w-50 btn btn-outline-danger  mt-4 mx-0'>Cancelar</button>

                </div>
            </form>
        </Container>
    );
};

export default CrearTransaccion;