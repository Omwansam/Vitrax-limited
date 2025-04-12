import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductsManagement.css'

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API in real app
    setProducts([
      { id: 1, name: 'Modern Sofa', category: 'Sofas', price: 899, stock: 15, sales: 42 },
      { id: 2, name: 'Wooden Dining Table', category: 'Tables', price: 599, stock: 8, sales: 23 },
      { id: 3, name: 'Comfy Armchair', category: 'Chairs', price: 349, stock: 12, sales: 37 },
      { id: 4, name: 'Bookshelf', category: 'Storage', price: 199, stock: 5, sales: 18 },
      { id: 5, name: 'Coffee Table', category: 'Tables', price: 249, stock: 10, sales: 29 }
    ]);
  }, []);

  const handleDelete = (id) => {
    // Call your API to delete the product (simulate here)
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  };

  return (
    <div className="products-management">
      <div className="section-header">
        <h2>Product Management</h2>
        <Link to="/admin/products/add" className="btn-primary">
          Add New Product
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Sales</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.sales}</td>
              <td>
                <Link to={`/admin/products/edit/${product.id}`} className="btn-edit">
                  Edit
                </Link>
                <button onClick={() => handleDelete(product.id)} className="btn-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsManagement;

