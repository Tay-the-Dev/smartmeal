import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import Restaurants from './components/pages/Restaurants';
import Restaurant from './components/pages/Restaurant';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import Orders from './components/orders/Orders';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Alert />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/restaurants" component={Restaurants} />
                    <Route exact path="/restaurants/:id" component={Restaurant} />
                    <Route exact path="/cart" component={Cart} />
                    <PrivateRoute exact path="/checkout" component={Checkout} />
                    <PrivateRoute exact path="/orders" component={Orders} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
