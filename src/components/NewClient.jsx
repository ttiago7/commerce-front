import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Form, Button, Modal, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postClient } from '../redux/clientDucks';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const NewClient = () => {
	console.log('4 - New Client component');
	const dispatch = useDispatch();
	const history = useHistory();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const [condicionImpositiva, setCondicionImpositiva] = useState(
		'IVA Responsable Inscripto'
	);
	const [tipoDocumento, setTipoDocumento] = useState('DNI');

	const onSubmit = (data, e) => {
		let cliente = {
			domicilio: data.domicilio,
			condicionImpositiva: condicionImpositiva,
			tipoDocumento: tipoDocumento,
			numeroDocumento: data.numeroDocumento,
		};
		dispatch(postClient(cliente)).then((res) => {
			//localStorage.setItem('Cliente', JSON.stringify(res));// responde la url
			//redireccionar al home
			let path = `/`;
			history.push(path);
		});
		e.target.reset(); // reset after form submit
	};

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<h2>Form to create a new client</h2>
					<hr></hr>
					<input
						placeholder='Ingrese domicilio'
						className='form-control mb-2'
						name='domicilio'
						type='text'
						{...register('domicilio', {
							required: {
								value: true,
								message: 'domicilio es requerido',
							},
						})}
					></input>

					<Form.Group
						as={Row}
						controlId='formHorizontalCondicionImpositiva'
					>
						<Form.Label column sm={4}>
							Condición impositiva del cliente
						</Form.Label>
						<Col sm={8}>
							<Form.Control
								as='select'
								defaultValue='IVA Responsable Inscripto'
								name='condicionImpositiva'
								onChange={(e) =>
									setCondicionImpositiva(e.target.value)
								}
							>
								<option value='IVA Responsable Inscripto'>
									IVA Responsable Inscripto
								</option>
								<option value='Monotributo'>Monotributo</option>
								<option value='IVA no Responsable'>
									IVA no Responsable
								</option>
							</Form.Control>
						</Col>
					</Form.Group>

					<Form.Group
						as={Row}
						controlId='formHorizontalTipoDocumento'
					>
						<Form.Label column sm={4}>
							Tipo de documento del cliente
						</Form.Label>
						<Col sm={8}>
							<Form.Control
								as='select'
								defaultValue='DNI'
								name='tipoDocumento'
								onChange={(e) =>
									setTipoDocumento(e.target.value)
								}
							>
								<option value='DNI'>DNI</option>
								<option value='CUIT'>CUIT</option>
							</Form.Control>
						</Col>
					</Form.Group>

					<input
						placeholder='Ingrese el numero de documento'
						className='form-control mb-2'
						name='numeroDocumento'
						type='text'
						{...register('numeroDocumento', {
							required: {
								value: true,
								message: 'Numero de documento es requerido',
							},
							maxLength: {
								value: 11,
								message: 'Max of 11 characters',
							},
							minLength: {
								value: 1,
								message: 'Min of 1 characters',
							},
							validate: {
								positiveNumber: (value) =>
									parseFloat(value) > 0,
								lessThanHundred: (value) =>
									parseFloat(value) < 99999999999,
							},
						})}
					></input>
					{errors.value && (
						<span className='text-danger text-small d-block mb-2'>
							{errors.value.message}
						</span>
					)}

					{errors.value && errors.value.type === 'positiveNumber' && (
						<span className='text-danger text-small d-block mb-2'>
							Your value is invalid
						</span>
					)}
					{errors.value &&
						errors.value.type === 'lessThanHundred' && (
							<span className='text-danger text-small d-block mb-2'>
								Your value should be greater than 99999999999
							</span>
						)}
				</Modal.Body>

				<Modal.Footer>
					<Button type='reset' variant='secondary'>
						Standard Reset Field Values
					</Button>
					<Button type='submit' className='btn btn-primary'>
						Save
					</Button>
				</Modal.Footer>
			</Form>
		</>
	);
};
export default NewClient;
