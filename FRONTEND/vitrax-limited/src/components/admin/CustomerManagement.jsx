import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerManagement.css'

const CustomersManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, fetch customers from API with search filter
    const mockCustomers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-123-4567', orders: 3, joinDate: '2023-01-15', totalSpent: 1248 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-987-6543', orders: 5, joinDate: '2022-11-22', totalSpent: 2345 },
      { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '555-456-7890', orders: 2, joinDate: '2023-03-10', totalSpent: 599 },
      { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '555-789-0123', orders: 1, joinDate: '2023-04-05', totalSpent: 898 },
      { id: 5, name: 'Michael Brown', email: 'michael@example.com', phone: '555-234-5678', orders: 4, joinDate: '2022-12-18', totalSpent: 1296 }
    ];
    setCustomers(mockCustomers);
  }, [searchTerm]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCustomer = (customerId) => {
    navigate(`/admin/customers/${customerId}`);
  };

  return (
    <div className="customers-management">
      <div className="section-header">
        <h2>Customer Management</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Orders</th>
            <th>Total Spent</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.orders}</td>
              <td>${customer.totalSpent}</td>
              <td>{customer.joinDate}</td>
              <td>
                <button 
                  className="btn-view"
                  onClick={() => handleViewCustomer(customer.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersManagement;

