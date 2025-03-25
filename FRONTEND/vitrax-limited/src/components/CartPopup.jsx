import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FiX } from "react-icons/fi";
import "./CartPopup.css";

const CartPopup = ({ product, quantity, onClose }) => {
  const navigate = useNavigate(); // Hook for navigation

  if (!product) return null;

  return (
    <div className="cart-popup-overlay">
      <div className="cart-popup">
        <h2>Shopping Cart</h2>
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>

        <div className="cart-item">
          <img src={product.images[0]} alt={product.name} className="cart-item-img" />
          <div className="cart-item-details">
            <h3>{product.name}</h3>
            <p>Quantity: {quantity}</p>
            <p className="cart-price">Rs. {product.price.toLocaleString()}</p>
          </div>
        </div>

        <div className="cart-subtotal">
          <p><strong>Subtotal:</strong> Rs. {(product.price * quantity).toLocaleString()}</p>
        </div>

        <div className="cart-buttons">
          <button className="view-cart-btn" onClick={() => navigate("/cart")}>View Cart</button>
          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;

