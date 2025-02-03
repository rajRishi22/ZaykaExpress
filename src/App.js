import React from 'react';
import './App.css';
import Home from './screens/Home';
import Signup from './screens/Signup';
import Cart from './screens/Cart';  
import AboutUs from './screens/AboutUs';
import Contact from './screens/Contact';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import { CartProvider } from './components/ContextReducer';
import Booking from './screens/Booking';

function App() {
  return (
    <CartProvider>
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/createUser" element={<Signup />} />
        <Route exact path="/myorders" element={<Booking />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
