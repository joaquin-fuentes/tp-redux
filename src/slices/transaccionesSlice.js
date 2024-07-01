import { createSlice } from '@reduxjs/toolkit';

const cargarTransacciones = () => {
	const transaccionesAlmacenadas = localStorage.getItem('transacciones');
	return transaccionesAlmacenadas ? JSON.parse(transaccionesAlmacenadas) : [];
};

const guardarTransacciones = (transacciones) => {
	localStorage.setItem('transacciones', JSON.stringify(transacciones));
};

const transaccionesSlice = createSlice({
	name: 'transacciones',
	initialState: cargarTransacciones(),
	reducers: {
		agregarTransaccion: (state, action) => {
			state.push(action.payload);
			guardarTransacciones(state);
		},

		actualizarTransaccion: (state, action) => {
			const transaccionIndex = state.findIndex((transaccion) => transaccion.id === action.payload.id);
			if (transaccionIndex !== -1) {
				state[transaccionIndex] = action.payload;
				guardarTransacciones(state);
			}
		},
		eliminarTransaccion: (state, action) => {
			const transacciones = state.filter((transaccion) => transaccion.id !== action.payload);
			guardarTransacciones(transacciones);
			return transacciones;  // Asegúrate de devolver el nuevo estado
		}
	},
});

export const { agregarTransaccion, actualizarTransaccion, eliminarTransaccion } = transaccionesSlice.actions;

export default transaccionesSlice.reducer;