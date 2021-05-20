import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Form, Container, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { postCreditNote } from '../redux/creditNoteDucks'; // obtenemos la accion obtenerCategoriasAccion exportada en ../redux/categoryDucks.js
import { getAllInvoices } from '../redux/invoiceDucks';
import Swal from 'sweetalert2';

const Invoices = () => {
	const dispatch = useDispatch(); // ahora con dispatch podemos ejecutar nuestras acciones
	const history = useHistory();

	const invoices = useSelector((store) => store.invoice.all); //devuelve el store, uso categorys x q asi lo llame en el store, .array nos trae el array q tenemos dentro

	console.log('8 - Invoices containers');
	useEffect(() => {
		dispatch(getAllInvoices());
	}, []);

	const emitirNotaCredito = (factura) => {
		dispatch(postCreditNote(factura)).then((res) => {
			//recargar para ver los cambios en el estado
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Se emitió la nota de crédito correctamente',
				showConfirmButton: false,
				timer: 1500,
			});
		});
	};

	return invoices ? (
		<Container fluid>
			<Card>
				<Card.Body>
					<h2>Facturas emitidas</h2>
				</Card.Body>
			</Card>
			{invoices.map((factura) => {
				return (
					<div className='mx-4 my-4' key={factura.idFactura}>
						<Card className='text-center'>
							<Card.Header as='h5'>
								Factura Nº {factura.cabecera.numeroDocumento}
							</Card.Header>
							<Card.Body>
								<Card.Text>
									Cliente{' '}
									{factura.cabecera.cliente.tipoDocumento}:
									{factura.cabecera.cliente.numeroDocumento}
									<br></br>
									Condición impositiva:{' '}
									{
										factura.cabecera.cliente
											.condicionImpositiva
									}
									<br></br>
									Domicilio:{' '}
									{factura.cabecera.cliente.domicilio}
								</Card.Text>
								<Card.Title>Detalle de la factura</Card.Title>
								<Table striped bordered hover variant='dark'>
									<thead>
										<tr>
											<th>Codigo</th>
											<th>Descripción</th>
											<th>Precio</th>
											<th>Cantidad</th>
											<th>% Iva</th>
											<th>Monto Iva</th>
											<th>Precio Neto</th>
											<th>Precio Venta</th>
										</tr>
									</thead>
									<tbody>
										{factura.detalleFactura.map(
											(detalle) => {
												return (
													<tr
														key={
															detalle.idDetalleFactura
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
														<td>
															{detalle.cantidad}
														</td>
														<td>
															{
																detalle.porcentajeIva
															}
														</td>
														<td>
															{detalle.montoIva}
														</td>
														<td>
															{detalle.precioNeto}
														</td>
														<td>
															{
																detalle.precioVenta
															}
														</td>
													</tr>
												);
											}
										)}
									</tbody>
								</Table>
							</Card.Body>
							<Card.Footer className='text-muted'>
								<div className='row' key={factura.idFactura}>
									<Col sm={6}>
										<h4>
											Iva :{factura.totalIva} ------ Total
											:{factura.total}
										</h4>
									</Col>
									<Col sm={6}>
										<Button
											variant='primary'
											onClick={() =>
												emitirNotaCredito(factura)
											}
										>
											Emitir nota de credito
										</Button>
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

export default Invoices;
