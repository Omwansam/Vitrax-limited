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
import Login from "./components/user/Login";


//Admmin Components
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard"
import ProductsManagement from "./components/admin/ProductsManagement";
import AddProduct from "./components/admin/AddProduct";
import OrdersManagement from "./components/admin/OrdersManagement";
import CustomerManagement from "./components/admin/CustomerManagement";
import Analytics from "./components/admin/Analytics";
import Settings from "./components/admin/Settings";
import ProtectedRoute from "./components/ProtectedRoute";







function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />  
        <Route path="/singleproduct/:productId" element={<SingleProduct />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />


        {/**Admin Routes */}
        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="admin/*" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductsManagement/>} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;