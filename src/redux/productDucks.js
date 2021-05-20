import axios from 'axios';
import Swal from 'sweetalert2';

const dataInicial = {
	all: [],
	newProduct: {},
};

//CONSTANTES

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const POST_PRODUCT = 'POST_RATE';

export const postProduct = (newProduct) => async (dispatch, getState) => {
	try {
		const res = await axios.post(
			'http://localhost:8080/productos/',
			newProduct
		); //axios genera la respuesta en .data
		dispatch({
			type: POST_PRODUCT,
			payload: res.data.rate,
		});
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Upgrade rate correctly',
			showConfirmButton: false,
			timer: 1000,
		});
		return res;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const getAllProducts = () => async (dispatch, getState) => {
	// 2 funciones de flecha x q la 1 no necesita params para ejecutarse
	//la 2 recibe dispatch para despachar la accion al reducer y getState podremos obtener la info q tenga el estado
	try {
		const res = await axios.get('http://localhost:8080/productos/all/'); //axios genera la respuesta en .data
		dispatch({
			type: GET_ALL_PRODUCTS,
			payload: res.data,
		});
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const getProductLike = (buscado) => async (dispatch, getState) => {
	// 2 funciones de flecha x q la 1 no necesita params para ejecutarse
	//la 2 recibe dispatch para despachar la accion al reducer y getState podremos obtener la info q tenga el estado
	try {
		const res = await axios.get(
			`http://localhost:8080/productos/search/${buscado}`
		); //axios genera la respuesta en .data
		dispatch({
			type: GET_ALL_PRODUCTS,
			payload: res.data,
		});
	} catch (error) {
		console.log('Error: ' + error);
	}
};

//REDUCER
export default function productReducer(state = dataInicial, action) {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return {
				...state,
				all: action.payload,
			};
		case POST_PRODUCT:
			return {
				...state,
				newProduct: action.payload,
			};
		default:
			return state;
	}
}
