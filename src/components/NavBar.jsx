import React from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
	const history = useHistory();

	const buscar = (path) => {
		history.push(path);
	};

	return (
		<>
			<Navbar bg='primary' variant='dark'>
				<Navbar.Brand href='/'>Home</Navbar.Brand>
				<Nav className='mr-auto'>
					<Nav.Link href='http://localhost:3000/confirmOrder'>
						Confirm order
					</Nav.Link>
					<Nav.Link onClick={() => buscar(`/orders/state/pendiente`)}>
						Pending orders
					</Nav.Link>
					{/* <Nav.Link onClick={() => buscar(`/orders/state/facturado`)}>
						Orders invoiced
					</Nav.Link> */}
					<Nav.Link href='http://localhost:3000/invoices'>
						Invoices
					</Nav.Link>
					<Nav.Link href='http://localhost:3000/creditNotes'>
						Credits notes
					</Nav.Link>
					<Nav.Link href='http://localhost:3000/newClient'>
						Create client
					</Nav.Link>
					<Nav.Link href='http://localhost:3000/newProduct'>
						Create product
					</Nav.Link>
				</Nav>
			</Navbar>
		</>
	);
};
export default NavBar;
