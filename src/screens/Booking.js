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
      console.log("Response from server:", response);
      const data = await response.json();
      console.log("Data received:", data);
      console.log("Order data:", data.orderData.order_data);
      if (data.orderData && data.orderData.order_data) {
        const validOrders = data.orderData.order_data.filter(order => order.items && order.items.length > 0).reverse();
        setOrders(validOrders);
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
          orders.map((order, index) => (
            <div key={order._id || index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Order #{orders.length - index}</h5>
                <p className="card-text"><strong>Order Date:</strong> {new Date(order.Order_date).toLocaleDateString()} {new Date(order.Order_date).toLocaleTimeString()}</p>
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
                      {Array.isArray(order.items) ? order.items.map((item, itemIndex) => (
                        <tr key={item._id || itemIndex}>
                          <td>{item.foodName}</td>
                          <td>{item.qty}</td>
                          <td>{item.size}</td>
                          <td>₹{item.price}</td>
                        </tr>
                      )) : null}
                    </tbody>
                  </table>
                </div>
                <p className="card-text mt-2"><strong>Total Price:</strong> ₹{order.totalPrice}</p>
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
