// AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    setStats({
      totalSales: 3343,
      totalProducts: 5,
      totalOrders: 5,
      totalCustomers: 5
    });

    setRecentOrders([
      { id: 1001, customer: 'John Doe', date: '2023-05-15', amount: 1248, status: 'Shipped' },
      { id: 1002, customer: 'Jane Smith', date: '2023-05-16', amount: 349, status: 'Delivered' },
      { id: 1003, customer: 'Robert Johnson', date: '2023-05-17', amount: 599, status: 'Processing' },
      { id: 1004, customer: 'Emily Davis', date: '2023-05-18', amount: 898, status: 'Shipped' },
      { id: 1005, customer: 'Michael Brown', date: '2023-05-19', amount: 249, status: 'Pending' }
    ]);
  }, []);

  return (
    <div className="dashboard-overview">
      <h2>Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>${stats.totalSales}</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Customers</h3>
          <p>{stats.totalCustomers}</p>
        </div>
      </div>

      <div className="recent-activity">
        <div className="section-header">
          <h3>Recent Orders</h3>
          <Link to="/admin/orders" className="btn-primary">
            View All Orders
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>${order.amount}</td>
                <td><span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

