import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import config from '../config';

function Booking() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`https://zayka-express-evl9.vercel.app/api/myOrderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail
        })
      });
      const data = await response.json();
      
      if (data.orderData && data.orderData.order_data) {
        setOrders(data.orderData.order_data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <h2 className="mb-4">Your Orders</h2>
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : orders && orders.length > 0 ? (
          orders.map((orderArray, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Order #{index + 1}</h5>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Size</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(orderArray) ? orderArray.map((item, itemIndex) => (
                        <tr key={itemIndex}>
                          <td>{item.foodName}</td>
                          <td>{item.qty}</td>
                          <td>{item.size}</td>
                          <td>₹{item.price}</td>
                        </tr>
                      )) : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;