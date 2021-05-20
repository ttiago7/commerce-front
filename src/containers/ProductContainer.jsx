import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Form, Container, Col } from 'react-bootstrap';

import { getAllProducts } from '../redux/productDucks'; // obtenemos la accion obtenerCategoriasAccion exportada en ../redux/categoryDucks.js
import ProductRow from '../components/ProductRow';

const ProductContainer = () => {
	const dispatch = useDispatch(); // ahora con dispatch podemos ejecutar nuestras acciones

	const productos = useSelector((store) => store.product.all); //devuelve el store, uso categorys x q asi lo llame en el store, .array nos trae el array q tenemos dentro

	console.log('1 - ProductContainer containers');
	useEffect(() => {
		dispatch(getAllProducts());
	}, []);

	return productos ? (
		<Container fluid>
			<div className='mx-4 my-4'>
				<Table striped bordered hover variant='dark'>
					<thead>
						<tr>
							<th>Codigo</th>
							<th>Descripción</th>
							<th>Precio</th>
							<th>Cantidad</th>
							<th>Agregar al pedido</th>
						</tr>
					</thead>
					<tbody>
						{productos.map((p) => {
							return <ProductRow prod={p} key={p.codigo} />;
						})}
					</tbody>
				</Table>
			</div>
		</Container>
	) : (
		<h1>No existen productos</h1>
	);
};

export default ProductContainer;
