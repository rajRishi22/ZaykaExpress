// import logo from './logo.svg';
import './App.css';
import Home from './screens/Home';
import Signup from './screens/Signup';
import Cart from './screens/Cart';  
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import { CartProvider } from './components/ContextReducer';
function App() {
  return (
    <CartProvider>
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createUser" element={<Signup />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
