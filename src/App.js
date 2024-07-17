// import logo from './logo.svg';
import './App.css';
import Home from './screens/Home';
import Signup from './screens/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createUser" element={<Signup />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
