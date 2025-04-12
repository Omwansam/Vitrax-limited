import { useState, useEffect } from 'react';
import './Analytics.css'

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [salesData, setSalesData] = useState({});
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // In a real app, fetch analytics data from API based on timeRange
    const mockSalesData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [4500, 5200, 7800, 8200, 9500, 10200]
    };
    setSalesData(mockSalesData);

    const mockTopProducts = [
      { id: 1, name: 'Modern Sofa', sales: 42, revenue: 37758 },
      { id: 2, name: 'Comfy Armchair', sales: 37, revenue: 12913 },
      { id: 3, name: 'Wooden Dining Table', sales: 23, revenue: 13777 },
      { id: 4, name: 'Coffee Table', sales: 29, revenue: 7221 },
      { id: 5, name: 'Bookshelf', sales: 18, revenue: 3582 }
    ];
    setTopProducts(mockTopProducts);
  }, [timeRange]);

  return (
    <div className="analytics">
      <div className="section-header">
        <h2>Sales Analytics</h2>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Sales Overview</h3>
          <div className="chart-placeholder">
            {/* In a real app, use Chart.js or similar */}
            <p>Sales Chart for {timeRange} data</p>
            <p>Labels: {salesData.labels?.join(', ')}</p>
            <p>Values: {salesData.values?.join(', ')}</p>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Top Selling Products</h3>
          <div className="top-products">
            {topProducts.map((product, index) => (
              <div key={product.id} className="product-item">
                <span className="rank">{index + 1}</span>
                <div className="product-info">
                  <span className="name">{product.name}</span>
                  <span className="details">{product.sales} sold (${product.revenue})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="analytics-card full-width">
        <h3>Revenue by Category</h3>
        <div className="chart-placeholder">
          {/* Category revenue chart would go here */}
          <p>Revenue by category chart for {timeRange} period</p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Customer Acquisition</h3>
          <div className="chart-placeholder">
            <p>New customers over time</p>
          </div>
        </div>
        <div className="analytics-card">
          <h3>Order Fulfillment</h3>
          <div className="chart-placeholder">
            <p>Order status distribution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

