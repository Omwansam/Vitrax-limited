import React, {useState} from 'react'
import './Navbar.css'
import { Link } from "react-router-dom";
import { FaUser, FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa'

const Navbar = () => {

  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="nav-container">


        {/* Navigation Links*/}
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/shop" className="nav-link">Shop</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
        </ul>

        {/*Right Side Icons */}
        <div className="nav-icons">
          <Link to="">
          <button className="icon-btn">
            <FaUser className="icon" />
          </button>
          </Link>

          {/** Search Icon */}
          <button className="icon-btn search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <FaSearch className="icon" />
          </button>

          {/** Search Input (Toggle Visiblity) */}
          {isSearchOpen && (
            <input type="text" placeholder="Search......." className="search-input"/>
          )}

          {/*Favourites Icon*/}
          <Link to="">
          <button className="icon-btn">
            <FaHeart className="icon" />
          </button>
          </Link>

          {/*Shopping Cart Icon */}
          <Link to="">
          <button className="icon-btn">
            <FaShoppingCart className="icon" />
          </button>
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
