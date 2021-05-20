import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import generateStore from './redux/store.js';

import navbar from './components/NavBar.jsx';
import ProductContainer from './containers/ProductContainer';
import ClienteComponent from './components/Cliente';
import SearchComponent from './components/Search';
import NewClientComponent from './components/NewClient';
import NewProductComponent from './components/NewProduct';
import ConfirmOrderComponent from './components/ConfirmOrder';
import OrdersByState from './containers/OrdersByState';
import Invoices from './containers/Invoices';
import CreditNotes from './containers/CreditNotes';

export var store = null; // exporto el store para poder usarlo en util.js para dispatch action
function App() {
	store = generateStore();
	return (
		<Provider store={store}>
			<Router>
				<div className='App'>
					<Route path='/' component={navbar} />
					<Route path='/' exact component={ClienteComponent} />
					<Route path='/' exact component={SearchComponent} />
					<Route path='/' exact component={ProductContainer} />

					<Route path='/Invoices' component={Invoices} />
					<Route path='/creditNotes' component={CreditNotes} />
					<Route path='/newClient' component={NewClientComponent} />
					<Route path='/newProduct' component={NewProductComponent} />
					<Route
						path='/confirmOrder'
						component={ConfirmOrderComponent}
					/>
					<Route
						exact
						path='/orders/state/:estado'
						render={({ match }) => (
							<OrdersByState estado={match.params.estado} />
						)}
					/>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
