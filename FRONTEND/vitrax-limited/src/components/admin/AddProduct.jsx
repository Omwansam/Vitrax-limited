import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const API_BASE_URL = "http://127.0.0.1:5000/api";
const API_BASE = "http://127.0.0.1:5000";

const AddProduct = () => {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    product_name: '',
    product_description: '',
    product_price: '',
    stock_quantity: '',
    category_id: ''
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/categories`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!res.ok) throw new Error("Failed to load categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const combinedImages = [...images, ...selectedFiles].slice(0, 5); // Limit to 5
      setImages(combinedImages);
    }
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        formData.append(key, value);
      });

      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await fetch(`${API_BASE_URL}/product`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      await response.json();
      setNewProduct({
        product_name: '',
        product_description: '',
        product_price: '',
        stock_quantity: '',
        category_id: ''
      });
      setImages([]);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error adding product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Product added successfully!</div>}

      <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
        <div className="form-group">
          <label>Product Name</label>
          <input 
            type="text" 
            name="product_name" 
            value={newProduct.product_name} 
            onChange={handleInputChange} 
            placeholder="Enter product name" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="product_description" 
            value={newProduct.product_description} 
            onChange={handleInputChange} 
            placeholder="Enter product description" 
            required 
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select 
            name="category_id" 
            value={newProduct.category_id} 
            onChange={handleInputChange}
            required
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.category_name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Price ($)</label>
          <input 
            type="number" 
            name="product_price" 
            value={newProduct.product_price} 
            onChange={handleInputChange} 
            placeholder="Enter price" 
            required 
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Stock Quantity</label>
          <input 
            type="number" 
            name="stock_quantity" 
            value={newProduct.stock_quantity} 
            onChange={handleInputChange} 
            placeholder="Enter stock quantity" 
            required 
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Product Images (Max 5)</label>
          <input 
            type="file" 
            name="images" 
            onChange={handleImageChange} 
            multiple 
            accept="image/*"
          />

          <div className="image-preview">
            {images.map((image, index) => (
              <div key={index} className="preview-item">
                <img 
                  src={URL.createObjectURL(image)} 
                  alt={`Preview ${index}`} 
                  width="100"
                />
                <span>{image.name}</span>
                <button type="button" onClick={() => removeImage(index)}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={() => navigate('/admin/products')} 
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
