import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrdersManagement.css'

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, fetch orders from API with filters
    const mockOrders = [
      { id: 1001, customer: 'John Doe', date: '2023-05-15', amount: 1248, status: 'Shipped', items: 3 },
      { id: 1002, customer: 'Jane Smith', date: '2023-05-16', amount: 349, status: 'Delivered', items: 1 },
      { id: 1003, customer: 'Robert Johnson', date: '2023-05-17', amount: 599, status: 'Processing', items: 2 },
      { id: 1004, customer: 'Emily Davis', date: '2023-05-18', amount: 898, status: 'Shipped', items: 2 },
      { id: 1005, customer: 'Michael Brown', date: '2023-05-19', amount: 249, status: 'Pending', items: 1 }
    ];
    setOrders(mockOrders);
  }, [filterStatus, dateRange]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    // In real app, would call API to update status
  };

  const handleViewDetails = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  return (
    <div className="orders-management">
      <h2>Order Management</h2>
      
      <div className="order-filters">
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        
        <input 
          type="date" 
          placeholder="From date" 
          value={dateRange.start}
          onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
        />
        
        <input 
          type="date" 
          placeholder="To date" 
          value={dateRange.end}
          onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
        />
        
        <button 
          className="btn-primary"
          onClick={() => {
            setDateRange({ start: '', end: '' });
            setFilterStatus('all');
          }}
        >
          Reset Filters
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Items</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>{order.items}</td>
              <td>${order.amount}</td>
              <td>
                <select 
                  value={order.status} 
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button 
                  className="btn-view"
                  onClick={() => handleViewDetails(order.id)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersManagement;

