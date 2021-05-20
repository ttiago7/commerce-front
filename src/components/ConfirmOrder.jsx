import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
	Container,
	Table,
	Card,
	Form,
	Button,
	Row,
	Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postOrder } from '../redux/orderDucks';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Cliente from './Cliente.jsx';

const ConfirmOrder = () => {
	console.log('6 - Confirm component component');
	const dispatch = useDispatch();
	const history = useHistory();
	var orderLocal = JSON.parse(localStorage.getItem('Order'));

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data, e) => {
		dispatch(postOrder(orderLocal)).then((res) => {
			//eliminar el localStorage
			window.localStorage.clear();
			//redireccionar al home
			let path = `/`;
			history.push(path);
		});
	};

	//var [subTotal, setsubTotal] = useState(0);
	var [porcentajeIva, setPorcentajeIva] = useState(0);
	useEffect(() => {
		//
	}, []);

	const switchIva = (subt) => {
		switch (orderLocal.cliente.condicionImpositiva) {
			case 'IVA Responsable Inscripto':
				return ((subt * 10.05).toFixed(2) / 100).toFixed(2);
			case 'Monotributo':
				return ((subt * 21.0).toFixed(2) / 100).toFixed(2);
			case 'IVA no Responsable':
				return ((subt * 70.0).toFixed(2) / 100).toFixed(2);
			default:
				return 0;
		}
	};

	var subTotal = 0;
	return orderLocal ? (
		<>
			<Cliente />

			<Container fluid>
				<div className='mx-4 my-4'>
					<Table striped bordered hover variant='dark'>
						<thead>
							<tr>
								<th>Codigo</th>
								<th>Descripción</th>
								<th>Precio</th>
								<th>Cantidad</th>
							</tr>
						</thead>
						<tbody>
							{orderLocal.detallePedido.map((detalle) => {
								subTotal =
									subTotal +
									detalle.cantidad * detalle.producto.precio;
								return (
									<tr>
										<td>{detalle.producto.codigo}</td>
										<td>{detalle.producto.nombre}</td>
										<td>{detalle.producto.precio}</td>
										<td>{detalle.cantidad}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			</Container>
			<Container fluid>
				<div className='mx-4 my-4'>
					<Card className='text-center'>
						{/* <Card.Header>Featured</Card.Header> */}
						<Card.Body>
							<Card.Text>
								<Form.Group
									as={Row}
									controlId='formHorizontalConfirm'
								>
									<Form.Label column sm={4}>
										<h4>Subtotal :{subTotal}</h4>
										<h4>Iva :{switchIva(subTotal)}</h4>
									</Form.Label>
									<Col sm={8}>
										<div className='row'>
											<div className='w-60 mx-auto'>
												<Form
													inline
													onSubmit={handleSubmit(
														onSubmit
													)}
												>
													<Button
														type='submit'
														variant='success'
													>
														<h4>
															Confirmar Pedido
														</h4>
													</Button>
												</Form>
											</div>
										</div>
									</Col>
								</Form.Group>
							</Card.Text>
						</Card.Body>
						{/* <Card.Footer className='text-muted'>2 days ago</Card.Footer> */}
					</Card>
				</div>
			</Container>
		</>
	) : (
		<h1>No existe una orden pendiente de confirmación</h1>
	);
};

export default ConfirmOrder;
