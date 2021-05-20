import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Form, Container, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { postCreditNote, getAllCreditsNotes } from '../redux/creditNoteDucks'; // obtenemos la accion obtenerCategoriasAccion exportada en ../redux/categoryDucks.js
import Swal from 'sweetalert2';

const CreditNotes = () => {
	const dispatch = useDispatch(); // ahora con dispatch podemos ejecutar nuestras acciones
	const history = useHistory();

	const creditNotes = useSelector((store) => store.credit.all); //devuelve el store, uso categorys x q asi lo llame en el store, .array nos trae el array q tenemos dentro

	console.log('9 - Credit Notes containers');
	useEffect(() => {
		dispatch(getAllCreditsNotes());
	}, []);

	return creditNotes ? (
		<Container fluid>
			<Card>
				<Card.Body>
					<h2>Notas de crédito emitidas</h2>
				</Card.Body>
			</Card>
			{creditNotes.map((nota) => {
				return (
					<div className='mx-4 my-4' key={nota.idNotaCredito}>
						<Card className='text-center'>
							<Card.Header as='h5'>
								Nota de crédito Nº{' '}
								{nota.cabecera.numeroDocumento} Letra:{' '}
								{nota.cabecera.letra}
							</Card.Header>
							<Card.Body>
								<Card.Text>
									Cliente{' '}
									{nota.cabecera.cliente.tipoDocumento}:
									{nota.cabecera.cliente.numeroDocumento}
									<br></br>
									Condición impositiva:{' '}
									{nota.cabecera.cliente.condicionImpositiva}
									<br></br>
									Domicilio: {nota.cabecera.cliente.domicilio}
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
										{nota.factura.detalleFactura.map(
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
								<div className='row' key={nota.idFactura}>
									<Col sm={6}>
										<h4>Total :{nota.total}</h4>
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

export default CreditNotes;
