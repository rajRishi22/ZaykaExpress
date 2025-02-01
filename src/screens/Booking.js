import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function Booking() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    // Fetch orders from backend
    // To be implemented based on your backend
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <div className="orders-header d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ fontWeight: "600" }}>Past Orders</h2>
          <select className="form-select" style={{ width: "200px" }}>
            <option>All Orders</option>
            <option>Past Month</option>
            <option>Past 3 Months</option>
          </select>
        </div>

        {/* Order Cards */}
        <div className="orders-container">
          {orders.length === 0 ? (
            <div className="text-center py-5">
              <img 
                src="/no-orders.png" 
                alt="No orders" 
                style={{ width: "200px", opacity: "0.5" }}
              />
              <h4 className="mt-3">No orders yet</h4>
              <p className="text-muted">When you place your first order, it will appear here</p>
            </div>
          ) : (
            orders.map((order) => (
              <div 
                key={order.id} 
                className="order-card mb-4" 
                style={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: "20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-1">{order.restaurantName}</h5>
                    <p className="text-muted mb-2">{order.orderDate}</p>
                    <div className="order-status">
                      <span className={`badge ${
                        order.status === 'Delivered' ? 'bg-success' : 
                        order.status === 'Cancelled' ? 'bg-danger' : 
                        'bg-warning'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-end">
                    <h6>₹{order.totalAmount}</h6>
                    <small className="text-muted">{order.itemCount} items</small>
                  </div>
                </div>

                <hr />

                <div className="order-items">
                  {order.items?.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between mb-2">
                      <span>{item.quantity}x {item.name}</span>
                      <span>₹{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="order-actions mt-3 d-flex gap-3">
                  <button className="btn btn-outline-success" style={{ borderRadius: "8px" }}>
                    Reorder
                  </button>
                  <button className="btn btn-outline-dark" style={{ borderRadius: "8px" }}>
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>
        {`
          .order-card:hover {
            transform: translateY(-2px);
            transition: transform 0.2s ease;
          }
          .order-status .badge {
            padding: 8px 12px;
            border-radius: 6px;
          }
          .btn-outline-success:hover, .btn-outline-dark:hover {
            transform: scale(0.98);
          }
        `}
      </style>
    </div>
  );
}

export default Booking;