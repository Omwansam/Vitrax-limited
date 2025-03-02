import React from 'react'
import './Navbar.css'
import { FaUser, FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa'

const Navbar = () => {
  return (
    <>
    <div className="nav-links">
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <div className="nav-icons">
            <li><a href="#"><FaUser /></a></li>
            <li><a href="#"><FaSearch /></a></li>
            <li><a href="#"><FaHeart /></a></li>
            <li><a href="#"><FaShoppingCart /></a></li>
            </div>
        </ul>

    </div>
   
    
   <div className="header">
   <h1>Rocket single seater</h1>
   <a href="#" className="btn">Shop Now</a>
       <img src="Header.jpg" alt="" />
   </div>
    </>
  )
}

export default Navbar