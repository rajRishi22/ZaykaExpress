import React from 'react'
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from './Cart';
import { useCart } from './ContextReducer';

function Navbar() {
  let data=useCart();
  const [cartView,setCartView]=useState(false);
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('authToken');
    navigate('/login');
  }


  return (
    <>
    <nav className="custom-navbar navbar navbar-expand-lg">
  <div className="container-fluid">
    <Link className="navbar-brand fs-2 fst-italic" to="/">ZaykaExpress</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem('authToken'))?
        <li className="nav-item">
        <Link className="nav-link active fs-5 " aria-current="page" to="/myorders">My Orders</Link>
      </li>:""}
        <li className="nav-item">
          <Link className="nav-link active fs-5" to="/about">About Us</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active fs-5" to="/contact">Contact</Link>
        </li>
        </ul>
        <div className="nav-buttons d-flex align-items-center gap-3">
    {localStorage.getItem('authToken') ? (
      <>
        <button className="nav-btn" onClick={() => setCartView(true)}>
          Cart {" "}
          {data.length > 0 && <Badge pill bg="danger">{data.length}</Badge>}
        </button>
        <button onClick={handleLogout} className="nav-btn">Logout</button>
      </>
    ) : (
      <>
        <Link className="nav-btn" to="/login">Login</Link>
        <Link className="nav-btn btn-filled" to="/createuser">Sign Up</Link>
      </>
    )}
  </div>
</div>
</div>
</nav>
    {cartView ? <Modal onClose={() => setCartView(false)}><Cart/></Modal> : null}

    <style>
      {`
        .custom-navbar {
          background: white;
          box-shadow: 0 2px 15px rgba(0,0,0,0.06);
          padding: 12px 0;
          height: 75px;
          display: flex;
          align-items: center;
        }

        .container {
          max-width: 1280px;
          padding: 0 24px;
        }

        .navbar-brand {
          font-family: 'Poppins', sans-serif;
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.5px;
          background: linear-gradient(120deg, #FF5F6D, #FFC371);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-link {
          font-family: 'Inter', sans-serif;
          color: #2d3436 !important;
          font-weight: 500;
          font-size: 15px;
          margin: 0 16px;
          padding: 8px 0;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #FF5F6D;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .btn {
          font-family: 'Inter', sans-serif;
          padding: 10px 24px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.3px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cart-btn {
          border: 2px solid #FF5F6D;
          color: #FF5F6D;
          background: transparent;
          padding: 8px 20px;
          border-radius: 25px;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .cart-btn:hover {
          background: #FF5F6D;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 95, 109, 0.2);
        }

        .btn-login, .btn-signup {
          border: 2px solid #FF5F6D;
          padding: 8px 20px;
          border-radius: 25px;
          font-weight: 500;
          transition: all 0.3s ease;
          margin: 0 5px;
        }

        .btn-login {
          background: transparent;
          color: #FF5F6D;
        }

        .btn-signup {
          background: #FF5F6D;
          color: white;
        }

        .btn-login:hover, .btn-signup:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 95, 109, 0.2);
        }

        .btn-login:hover {
          background: #FF5F6D;
          color: white;
        }

        .btn-signup:hover {
          background: #ff4757;
          border-color: #ff4757;
        }

        .badge {
          font-family: 'Inter', sans-serif;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 12px;
          background: #FF5F6D !important;
        }

        @media (max-width: 991px) {
          .custom-navbar {
            height: auto;
            padding: 16px 0;
          }
          
          .container {
            padding: 0 16px;
          }

          .nav-link {
            margin: 8px 0;
          }

          .cart-btn, .btn-login, .btn-signup {
            margin: 5px 0;
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }
        .nav-buttons {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .nav-btn {
      padding: 8px 24px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 500;
      border: 2px solid #FF5F6D;
      color: #FF5F6D;
      background: transparent;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 100px;
    }

    .nav-btn:hover {
      background: #FF5F6D;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 95, 109, 0.2);
    }

    .btn-filled {
      background: #FF5F6D;
      color: white;
    }

    .btn-filled:hover {
      background: #ff4757;
      border-color: #ff4757;
    }

    @media (max-width: 991px) {
      .nav-buttons {
        flex-direction: row;
        width: 100%;
        margin-top: 10px;
      }
      
      .nav-btn {
        flex: 1;
      }
    }
      `}
    </style>
    </>
  )
}

export default Navbar