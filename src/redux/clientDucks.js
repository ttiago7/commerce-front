import axios from 'axios';
import Swal from 'sweetalert2';

const dataInicial = {
	all: [],
	client: {},
};

//CONSTANTES

const GET_ALL_CLIENTS = 'GET_ALL_CLIENTS';
const GET_CLIENT = 'GET_CLIENT';
const POST_CLIENT = 'POST_CLIENT';

export const postClient = (newClient) => async (dispatch, getState) => {
	try {
		const res = await axios.post(
			'http://localhost:8080/clientes/',
			newClient
		); //axios genera la respuesta en .data
		dispatch({
			type: POST_CLIENT,
			payload: res.data,
		});
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Created client correctly',
			showConfirmButton: false,
			timer: 1000,
		});
		return res.data;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const getAllClients = () => async (dispatch, getState) => {
	// 2 funciones de flecha x q la 1 no necesita params para ejecutarse
	//la 2 recibe dispatch para despachar la accion al reducer y getState podremos obtener la info q tenga el estado
	try {
		const res = await axios.get('http://localhost:8080/clientes/all/'); //axios genera la respuesta en .data
		dispatch({
			type: GET_ALL_CLIENTS,
			payload: res.data,
		});
		return res.data;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const getClient = (numero) => async (dispatch, getState) => {
	// 2 funciones de flecha x q la 1 no necesita params para ejecutarse
	//la 2 recibe dispatch para despachar la accion al reducer y getState podremos obtener la info q tenga el estado
	try {
		const res = await axios.get(
			`http://localhost:8080/clientes/numero/${numero}`
		); //axios genera la respuesta en .data
		dispatch({
			type: GET_CLIENT,
			payload: res.data,
		});
		return res.data;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

//REDUCER
export default function clientReducer(state = dataInicial, action) {
	switch (action.type) {
		case GET_ALL_CLIENTS:
			return {
				...state,
				all: action.payload,
			};
		case GET_CLIENT:
			return {
				...state,
				client: action.payload,
			};
		case POST_CLIENT:
			return {
				...state,
				client: action.payload,
			};
		default:
			return state;
	}
}
