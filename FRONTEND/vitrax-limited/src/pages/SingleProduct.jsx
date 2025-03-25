import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { FiFacebook, FiLinkedin, FiInstagram } from "react-icons/fi";
import products from "../ProductData"
import './SingleProduct.css'
import ProductDetails from '../components/ProductDetails';
import RelatedProducts from '../components/RelatedProducts';
import CartPopup from '../components/CartPopup';



const SingleProduct = () => {
  const {id} = useParams();
  const product = products.find((p) => p.id === Number(id));

  


  const images = product.images || ["/images/placeholder.jpg"];
  const colors = product.colors || ["#CCCCCC"];
  const sizes = ["L", "XL", "XS"];

  const [mainImage, setMainImage] = useState(images[0]); // Default image
  const [selectedColor, setSelectedColor] = useState(colors[0]); // Default color
  const [selectedSize, setSelectedSize] = useState(sizes[0]); // Default size
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);


  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
    <div className="single-container">
      {/* Left Side - Product Images */}
      <div className="single-images">
        <div className="thumbnail-list">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
              className={`thumbnail ${mainImage === img ? "active-thumb" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
        <img src={mainImage} alt="Main Product" className="main-image" />
      </div>

      {/* Right Side - Product Info */}
      <div className="single-info">
        <h1>{product.name}</h1>
        <p className="price">Rs. {product.price.toLocaleString()}</p>
        <div className="rating">
          ⭐⭐⭐⭐☆ <span>5 Customer Reviews</span>
        </div>
        <p className="description">{product.description}</p>

        {/* Size Options */}
        <div className="size-selection">
          <p>Size</p>
          <div className="size-options">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "selected-size" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="color-selection">
          <p>Color</p>
          <div className="color-options">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`color-circle ${selectedColor === color ? "selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="quantity-container">
          <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button className="add-to-cart" onClick={() => setIsCartOpen(true)}>
            Add To Cart
        </button>

        {/* Cart Popup */}
      {isCartOpen && <CartPopup product={product} quantity={quantity} onClose={() => setIsCartOpen(false)} />}

        {/* Additional Product Info */}
        <div className="single-meta">
          <p><strong>SKU:</strong> {product.sku || "SS001"}</p>
          <p><strong>Category:</strong> {product.category || "Sofas"}</p>
          <p><strong>Tags:</strong> {product.tags?.join(", ") || "Sofa, Chair, Home, Shop"}</p>
        </div>

        {/* Social Sharing  */}
        <div className="single-icons">
          <FiFacebook className="social-icon" />
          <FiLinkedin className="social-icon" />
          <FiInstagram className="social-icon" />
        </div>
      </div>
    </div>
    <ProductDetails />
    <RelatedProducts />
    </div>
  )
}

export default SingleProduct
