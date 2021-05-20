import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Form, Container, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import {
	getOrderByState,
	deleteOrder,
	updateStateOrder,
} from '../redux/orderDucks'; // obtenemos la accion obtenerCategoriasAccion exportada en ../redux/categoryDucks.js
import { postFactura } from '../redux/invoiceDucks';
import Swal from 'sweetalert2';

const OrdersByState = ({ estado }) => {
	const dispatch = useDispatch(); // ahora con dispatch podemos ejecutar nuestras acciones
	const history = useHistory();

	const orders = useSelector((store) => store.order.all); //devuelve el store, uso categorys x q asi lo llame en el store, .array nos trae el array q tenemos dentro

	console.log('7 - Orders by state containers');
	useEffect(() => {
		dispatch(getOrderByState(estado));
	}, [estado]);

	const cancelarPedido = (pedido) => {
		dispatch(deleteOrder(pedido.numeroPedido)).then((res) => {
			//recargar para ver los cambios en el estado
			history.push(`/orders/state/${estado}`);
		});
	};

	const facturarTodo = () => {
		orders.map((pedido) => {
			//facturamos todo
			dispatch(postFactura(pedido)).then((res) => {
				//cambiar el estado de los pedidos a facturado
				pedido.estado = 'facturado';
				dispatch(updateStateOrder(pedido)).then((res) => {
					//recargar para ver los cambios en el estado
					history.push(`/orders/state/${estado}`);
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Se facturaron los pedidos correctamente',
						showConfirmButton: false,
						timer: 1500,
					});
				});
			});
		});
	};

	const switchIva = (cliente, subt) => {
		switch (cliente.condicionImpositiva) {
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
	return orders ? (
		<Container fluid>
			<Card>
				<Card.Body>
					<div className='row'>
						<h2>Pedidos con estado {estado}</h2>
						{estado !== 'facturado' ? (
							<Button
								className='mx-5'
								variant='primary'
								onClick={() => facturarTodo()}
							>
								Facturar pedidos
							</Button>
						) : (
							<></>
						)}
					</div>
				</Card.Body>
			</Card>
			{orders.map((pedido) => {
				return (
					<div className='mx-4 my-4' key={pedido.numeroPedido}>
						<Card className='text-center'>
							<Card.Header as='h5'>
								Pedido Nº {pedido.numeroPedido}
							</Card.Header>
							<Card.Body>
								<Card.Text>
									Cliente {pedido.cliente.tipoDocumento}:
									{pedido.cliente.numeroDocumento}
									<br></br>
									Condición impositiva:{' '}
									{pedido.cliente.condicionImpositiva}
									<br></br>
									Domicilio: {pedido.cliente.domicilio}
								</Card.Text>
								<Card.Title>Detalle del pedido</Card.Title>
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
										{(subTotal = 0)}
										{pedido.detallePedido.map((detalle) => {
											subTotal =
												subTotal +
												detalle.cantidad *
													detalle.producto.precio;
											return (
												<tr
													key={
														detalle.idDetallePedido
													}
												>
													<td>
														{
															detalle.producto
																.codigo
														}
													</td>
													<td>
														{
															detalle.producto
																.nombre
														}
													</td>
													<td>
														{
															detalle.producto
																.precio
														}
													</td>
													<td>{detalle.cantidad}</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							</Card.Body>
							<Card.Footer className='text-muted'>
								<div className='row' key={pedido.numeroPedido}>
									<Col sm={6}>
										<h4>
											Subtotal :{subTotal} + Iva :
											{switchIva(
												pedido.cliente,
												subTotal
											)}
										</h4>
									</Col>
									<Col sm={6}>
										{estado === 'pendiente' ? (
											<Button
												variant='primary'
												onClick={() =>
													cancelarPedido(pedido)
												}
											>
												Cancelar pedido
											</Button>
										) : (
											<></>
										)}
									</Col>
								</div>
							</Card.Footer>
						</Card>
					</div>
				);
			})}
		</Container>
	) : (
		<h1>No existen ordenes</h1>
	);
};

export default OrdersByState;
