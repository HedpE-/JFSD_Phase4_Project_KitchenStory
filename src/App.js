import React from 'react'
import './App.css';
import './components/jumbotron.css';
//import {
//  CartComponent,
//  ProductComponent,
//  CheckoutButtonComponent,
//  cartLocalization
//} from "react-shopping-cart";

import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CartDetails from './components/CartDetails';
import Items from './components/Items';
import Checkout from './components/Checkout';
import Congrats from './components/Congrats';
import History from './components/History';
import Register from './components/Register';
import Login from './components/Login';
import ItemsMasterlist from './components/ItemsMasterlist';
import UsersMasterlist from './components/UsersMasterlist';
    
//const { getDefaultLocalization } = cartLocalization;

function App() {
    //const [cart, setCart] = useState()
    
    return (
        <div className="App">
            <header>
                <Navbar/>
            </header>
            <body>
                <div className="my-5 pt-5">
                    <Routes>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/cart' element={<CartDetails/>}></Route>
                        <Route path='/products' element={<Items/>}></Route>
                        <Route path='/checkout' element={<Checkout/>}></Route>
                        <Route path='/congrats' element={<Congrats/>}></Route>
                        <Route path='/history' element={<History/>}></Route>
                        <Route path='/register' element={<Register/>}></Route>
                        <Route path='/login' element={<Login/>}></Route>
                        <Route path='/itemsMasterlist' element={<ItemsMasterlist/>}></Route>
                        <Route path='/usersMasterlist' element={<UsersMasterlist/>}></Route>
                    </Routes>
                </div>
            </body>
            <footer class="text-muted text-center text-small">
                <p class="mb-1">&copy; 2022 Kitchen Story</p>
                <ul class="list-inline">
                    <li class="list-inline-item"><a href="/privacy">Privacy</a></li>
                    <li class="list-inline-item"><a href="/terms">Terms</a></li>
                    <li class="list-inline-item"><a href="/support">Support</a></li>
                </ul>
            </footer>
        </div>
    );
}

export default App;
