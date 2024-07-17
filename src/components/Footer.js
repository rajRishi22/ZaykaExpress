import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <p className="col-md-4 mb-0 text-muted">© 2024 ZaykaExpress, Inc</p>

    <Link to="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <div className='navbar-brand fs-2 fst-italic'>ZaykaExpress</div>
    </Link>
  </footer>

    </div>
  )
}

export default Footer