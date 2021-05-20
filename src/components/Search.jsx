import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Container, Form } from 'react-bootstrap';
import { getProductLike, getAllProducts } from '../redux/productDucks';
import { useForm } from 'react-hook-form';

const Search = () => {
	console.log('3 - Searchhhhhhh');

	const dispatch = useDispatch();
	const productos = useSelector((store) => store.product.all); //devuelve el store, uso categorys x q asi lo llame en el store, .array nos trae el array q tenemos dentro

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data, e) => {
		dispatch(getProductLike(data.buscado)).then((res) => {
			//
		});
		e.target.reset(); // reset after form submit
	};

	return (
		<Container fluid>
			<div className='mx-4 my-4'>
				<div className='row'>
					<div className='w-60 mx-auto'>
						<Form inline onSubmit={handleSubmit(onSubmit)}>
							<input
								type='text'
								placeholder='Nombre del producto'
								className=' mr-sm-2'
								name='buscado'
								{...register('buscado', {
									required: {
										value: true,
										message:
											'Nombre del producto is required',
									},
								})}
							></input>
							<Button type='submit' variant='success'>
								Buscar
							</Button>

							<Button
								className='mx-2 my-2'
								variant='success'
								onClick={() => {
									dispatch(getAllProducts());
								}}
							>
								Ver todo
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Search;
