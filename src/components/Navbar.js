import React, { useState } from 'react'
import {  useCart } from './ContextReducer';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import Modal from '../Modal';

export default function Navbar() {
  let data=useCart();
  const [cartView, setCartView]=useState(false)
  const navigate=useNavigate();
  const handleLogout=()=>{
  localStorage.removeItem("authToken");
  navigate("/login")
  }
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar bg">
        <div className="container-fluid">

          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img
              src="https://thumbs.dreamstime.com/z/ food-serving-icon-vector-sign-symbol-isolated-white-backg-food-serving-icon-vector-isolated-white-background-your-133746737.jpg?w=768"
              height="80"
              alt="MDB Logo"
              loading="lazy"
            />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">

            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item fw-bold">
                <Link className="nav-link active fs-6" aria-current="page" to="/">Home</Link>
              </li>

              {(localStorage.getItem("authToken")) ?
                <li className="nav-item fw-bold">
                  <Link className="nav-link active fs-6" aria-current="page" to="/">My Orders</Link>
                </li>
                : " "
              }




            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>

                <Link className="nav-link bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="nav-link bg-white text-success mx-1" to="/createuser">Sign Up</Link>

              </div>
              :
              <div>

                <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                  My Cart
                  <Badge pill bg="danger rounded-pill m-1">{data.length}</Badge>
                </div>



                {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  Log Out
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
