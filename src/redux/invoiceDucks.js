import axios from 'axios';

const dataInicial = {
	all: [],
};

//CONSTANTES
const POST_FACTURA = 'POST_FACTURA';
const GET_ALL = 'GET_ALL';

export const postFactura = (order) => async (dispatch, getState) => {
	try {
		let fac = {
			pedido: order,
		};
		const res = await axios.post('http://localhost:8080/invoices/', fac); //axios genera la respuesta en .data
		dispatch({
			type: POST_FACTURA,
			payload: res.data,
		});
		return res.data;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const getAllInvoices = () => async (dispatch, getState) => {
	// 2 funciones de flecha x q la 1 no necesita params para ejecutarse
	//la 2 recibe dispatch para despachar la accion al reducer y getState podremos obtener la info q tenga el estado
	try {
		const res = await axios.get('http://localhost:8080/invoices/all/'); //axios genera la respuesta en .data
		dispatch({
			type: GET_ALL,
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
		case POST_FACTURA:
			return {
				...state,
				all: state.all.push(action.payload),
			};
		case GET_ALL:
			return {
				...state,
				all: action.payload,
			};
		default:
			return state;
	}
}
