import axios from 'axios';

const dataInicial = {
	all: [],
	urlNewCreditNote: '',
};

//CONSTANTES
const POST_CREDIT_NOTE = 'POST_CREDIT_NOTE';
const GET_ALL = 'GET_ALL';

export const postCreditNote = (factura) => async (dispatch, getState) => {
	try {
		let nota = {
			factura: factura,
		};
		const res = await axios.post('http://localhost:8080/creditNote/', nota); //axios genera la respuesta en .data
		dispatch({
			type: POST_CREDIT_NOTE,
			payload: res.data,
		});
		return res.data;
	} catch (error) {
		console.log('Error: ' + error);
	}
};

export const getAllCreditsNotes = () => async (dispatch, getState) => {
	// 2 funciones de flecha x q la 1 no necesita params para ejecutarse
	//la 2 recibe dispatch para despachar la accion al reducer y getState podremos obtener la info q tenga el estado
	try {
		const res = await axios.get('http://localhost:8080/creditNote/all/'); //axios genera la respuesta en .data
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
		case POST_CREDIT_NOTE:
			return {
				...state,
				urlNewCreditNote: action.payload,
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
