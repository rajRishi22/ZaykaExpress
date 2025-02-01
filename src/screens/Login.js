import React from 'react'
import {useState} from 'react';
import  {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Login() {

  const [credentials,setcredentials]=useState({email:'',password:''});

  let navigate=useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({email:credentials.email,password:credentials.password}));
        const response=await fetch("https://zayka-express-evl9.vercel.app/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                
                email:credentials.email,
                password:credentials.password,
                
            })
        });
        const json=await response.json();
        console.log(json);  
        if(!json.success){
            alert('Enter valid details');
        }
        if(json.success){
          localStorage.setItem('userEmail',credentials.email);
          localStorage.setItem('authToken',json.authToken);
          console.log(localStorage.getItem('authToken'));
          navigate('/');
        }
        
    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

  return (
  <div className="login-container">
    <div className="login-card">
      <h2>Welcome Back</h2>
      <p className="text-muted mb-4">Please login to continue</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email"
            placeholder="name@example.com"
            value={credentials.email} 
            onChange={onChange}
          />
          <label htmlFor="email">Email address</label>
        </div>

        <div className="form-floating mb-4">
          <input 
            type="password" 
            className="form-control" 
            id="password"
            name="password"
            placeholder="Password"
            value={credentials.password} 
            onChange={onChange}
          />
          <label htmlFor="password">Password</label>
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Login
        </button>
        <Link to="/createuser" className="btn btn-outline w-100">
          Create New Account
        </Link>
      </form>
    </div>

    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
    </div>

    <style>
      {`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #FF5F6D, #FFC371);
          position: relative;
          overflow: hidden;
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .shape {
          height: 200px;
          width: 200px;
          position: absolute;
          border-radius: 50%;
        }

        .shape:first-child {
          background: linear-gradient(#FF5F6D, #FFC371);
          right: -100px;
          top: -100px;
        }

        .shape:last-child {
          background: linear-gradient(to right, #FF5F6D, #FFC371);
          left: -100px;
          bottom: -100px;
        }

        .login-card {
          width: 400px;
          background: rgba(255, 255, 255, 0.9);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 2;
        }

        h2 {
          color: #2d3436;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .form-floating > input {
          border: 2px solid #eee;
          border-radius: 12px;
          height: 55px;
        }

        .form-floating > input:focus {
          border-color: #FF5F6D;
          box-shadow: 0 0 0 0.25rem rgba(255, 95, 109, 0.1);
        }

        .btn {
          height: 50px;
          border-radius: 12px;
          font-weight: 500;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: #FF5F6D;
          border: none;
        }

        .btn-primary:hover {
          background: #ff4757;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 95, 109, 0.3);
        }

        .btn-outline {
          border: 2px solid #FF5F6D;
          color: #FF5F6D;
          background: transparent;
        }

        .btn-outline:hover {
          background: #FF5F6D;
          color: white;
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .login-card {
            width: 100%;
            padding: 30px 20px;
          }
        }
      `}
    </style>
  </div>
  )
}
