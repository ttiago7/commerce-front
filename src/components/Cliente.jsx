import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Container, Form, FormControl } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { getClient } from '../redux/clientDucks';
import { useForm } from 'react-hook-form';

const Cliente = () => {
	console.log('2 - Clienteeeeeeeeeeeeeeeeeeeeeeeeee');

	const dispatch = useDispatch();
	const cliente = useSelector((store) => store.client.client); //devuelve el store, uso categorys x q asi lo llame en el store, .array nos trae el array q tenemos dentro

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data, e) => {
		dispatch(getClient(data.numero)).then((res) => {
			//save client in localStorage
			localStorage.setItem('Cliente', JSON.stringify(res));
			var orderLocal = JSON.parse(localStorage.getItem('Order'));
			if (orderLocal) {
				orderLocal.cliente = res;
				localStorage.setItem('Order', JSON.stringify(orderLocal));
			}
		});
		e.target.reset(); // reset after form submit
	};

	useEffect(() => {
		var clienteLocal = JSON.parse(localStorage.getItem('Cliente'));
		if (clienteLocal) {
			dispatch(getClient(clienteLocal.numeroDocumento));
		} else {
			//dar el foco al imput para cargar un cliente
		}
	}, []);

	return (
		<Container fluid>
			<div className='mx-4 my-4'>
				<Card className='text-center'>
					{/* <Card.Header>Featured</Card.Header> */}
					<Card.Body>
						<Card.Title>
							{cliente ? (
								<b>
									{cliente.tipoDocumento}{' '}
									{cliente.numeroDocumento}
								</b>
							) : (
								<b>
									Ingrese el numero de documento del cliente
								</b>
							)}
						</Card.Title>
						<Card.Text>
							{cliente ? (
								<>
									Condición Impositiva:{' '}
									{cliente.condicionImpositiva}
									Domicilio:{cliente.domicilio}
								</>
							) : (
								<>Ingrese el numero de documento del cliente</>
							)}
						</Card.Text>

						<div className='row'>
							<div className='w-60 mx-auto'>
								<Form inline onSubmit={handleSubmit(onSubmit)}>
									<input
										type='text'
										placeholder='Numero de documento'
										className=' mr-sm-2'
										name='numero'
										{...register('numero', {
											required: {
												value: true,
												message: 'numero is required',
											},
										})}
									></input>
									<Button type='submit' variant='success'>
										Enviar
									</Button>
								</Form>
							</div>
						</div>
					</Card.Body>
					{/* <Card.Footer className='text-muted'>2 days ago</Card.Footer> */}
				</Card>
			</div>
		</Container>
	);
};

export default Cliente;
