import axios from 'axios';
import Swal from 'sweetalert2';

const dataInicial = {
	all: [],
	urlNewOrder: '',
	updateMessage: '',
};

//CONSTANTES

const GET_BY_STATE = 'GET_BY_STATE';
const POST_ORDER = 'POST_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

export const postOrder = (newOrder) => async (dispatch, getState) => {
	try {
		const res = await axios.post('http://localhost:8080/orders/', newOrder); //axios genera la respuesta en .data
		dispatch({
			type: POST_ORDER,
			payload: res.data,
		});
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Created order correctly',
			showConfirmButton: false,
			timer: 1000,
		});
		return res.data;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const updateStateOrder = (order) => async (dispatch, getState) => {
	try {
		const res = await axios.put('http://localhost:8080/orders/', order); //axios genera la respuesta en .data
		dispatch({
			type: UPDATE_ORDER,
			payload: res.data,
		});
		return res.data;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const deleteOrder = (numeroPedido) => async (dispatch, getState) => {
	try {
		const res = await axios.delete(
			`http://localhost:8080/orders/${numeroPedido}`
		); //axios genera la respuesta en .data
		dispatch({
			type: DELETE_ORDER,
			payload: numeroPedido,
		});
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Deleted order correctly',
			showConfirmButton: false,
			timer: 1000,
		});
		return res.data;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const getOrderByState = (state) => async (dispatch, getState) => {
	// 2 funciones de flecha x q la 1 no necesita params para ejecutarse
	//la 2 recibe dispatch para despachar la accion al reducer y getState podremos obtener la info q tenga el estado
	try {
		const res = await axios.get(
			`http://localhost:8080/orders/state/${state}`
		); //axios genera la respuesta en .data
		dispatch({
			type: GET_BY_STATE,
			payload: res.data,
		});
		return res.data;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

//REDUCER
export default function orderReducer(state = dataInicial, action) {
	switch (action.type) {
		case GET_BY_STATE:
			return {
				...state,
				all: action.payload,
			};
		case DELETE_ORDER:
			let numeroPedido = action.payload;
			let index = state.all.findIndex(
				(x) => x.numeroPedido === numeroPedido
			); // posicion del items a modificar
			if (index > -1) {
				state.all.splice(index, 1);
			}
			return {
				...state,
				// all: state,
			};
		case POST_ORDER:
			return {
				...state,
				urlNewOrder: action.payload,
			};
		case UPDATE_ORDER:
			return {
				...state,
				updateMessage: action.payload,
			};
		default:
			return state;
	}
}
