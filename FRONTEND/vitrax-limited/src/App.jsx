import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import SingleProduct from "./pages/SingleProduct";
import CheckOut from "./pages/CheckOut";
import Cart from "./pages/Cart";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;