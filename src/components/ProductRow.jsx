import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ProductRow = ({ prod }) => {
	const [cantidad, setCantidad] = useState(0);

	const addProductToOrder = () => {
		var clienteLocal = JSON.parse(localStorage.getItem('Cliente'));
		var orderLocal = JSON.parse(localStorage.getItem('Order'));
		if (clienteLocal) {
			//si hay cliente controlamos la orden
			if (cantidad % 1 === 0 && cantidad > 0) {
				if (orderLocal) {
					var newProd = {
						producto: prod,
						cantidad: cantidad,
					};
					orderLocal.detallePedido.push(newProd);
					localStorage.setItem('Order', JSON.stringify(orderLocal));
				} else {
					//crear la orden
					var order = {
						cliente: clienteLocal,
						detallePedido: [
							{
								producto: prod,
								cantidad: cantidad,
							},
						],
						estado: 'pendiente',
					};
					localStorage.setItem('Order', JSON.stringify(order));
				}
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Producto agregado correcatmente',
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Ingrese la cantidad que desea agregar a la orden',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} else {
			//mostrar mensaje con sweet alert - ingrese el dni del cliente para la orden
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Ingrese el numero de documento del cliente para la orden',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<>
			<tr>
				<td>{prod.codigo}</td>
				<td>{prod.nombre}</td>
				<td>{prod.precio}</td>
				<td>
					<Col sm={10}>
						<Form.Control
							size='sm'
							type='text'
							placeholder='Cantidad'
							onChange={(event) =>
								setCantidad(event.target.value)
							}
						/>
					</Col>
				</td>
				<td>
					<Button
						variant='success'
						size='sm'
						onClick={() => {
							addProductToOrder();
						}}
					>
						Agregar
					</Button>{' '}
				</td>
			</tr>
		</>
	);
};

export default ProductRow;
