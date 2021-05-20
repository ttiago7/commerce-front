import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Form, Button, Modal, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postProduct } from '../redux/productDucks';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const NewProduct = () => {
	console.log('5 - New Product component');
	const dispatch = useDispatch();
	const history = useHistory();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data, e) => {
		let producto = {
			nombre: data.nombre,
			precio: data.precio,
		};
		dispatch(postProduct(producto)).then((res) => {
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
					<h2>Form to create a new product</h2>
					<hr></hr>
					<input
						placeholder='Ingrese el nombre'
						className='form-control mb-2'
						name='nombre'
						type='text'
						{...register('nombre', {
							required: {
								value: true,
								message: 'nombre es requerido',
							},
						})}
					></input>

					<input
						placeholder='Ingrese el precio del producto'
						className='form-control mb-2'
						name='precio'
						type='text'
						{...register('precio', {
							required: {
								value: true,
								message: 'Precio del producto es requerido',
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
export default NewProduct;
