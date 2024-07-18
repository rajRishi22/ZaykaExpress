import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
function Navbar() {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('authToken');
    navigate('/login');
  }


  return (
    <>
    <nav className="navbar navbar-expand-lg bg-danger navbar-dark">
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
        <Link className="nav-link active fs-5 " aria-current="page" to="/">My Orders</Link>
      </li>:""}
        
        </ul>
        {!(localStorage.getItem('authToken'))?
        <div className='d-flex'>
        <Link className="btn bg-white mx-2 " to="/login">Login</Link>
        <Link className="btn bg-white " to="/createUser">Signup</Link>
        </div>
        :
        <div>
        <div className='btn bg-white text-sucess mx-2'>My Cart {" "}
          <Badge pill bg="danger">0</Badge>
        </div>

        <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>LogOut</div>
        </div>
        }
      
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar