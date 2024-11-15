import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Filter from './Filter';
import WrappedDetails from './Details';
import { CartProvider } from './CartContext';
import Cart from './Cart';

function App() {
  return (
    <div className="App">
       <header className="App-header">
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Filter />} />
            <Route path="/details/:subtype" element={<WrappedDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </CartProvider>
      </header>
    </div>
  );
}

export default App;