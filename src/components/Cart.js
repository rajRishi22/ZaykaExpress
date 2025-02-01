import React, { useState } from 'react'

import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [loading, setLoading] = useState(false);

  if (data.length === 0) {
    return (
      <div className="cart-modal">
        <div className="empty-state">
          <i className="bi bi-cart-x"></i>
          <h3>Your Cart is Empty</h3>
          <p>Add some delicious items to your cart!</p>
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    try {
        setLoading(true);
        let userEmail = localStorage.getItem("userEmail");
        
        // Create order data structure matching schema
        let orderData = {
            email: userEmail,
            order_data: [{
                Order_date: new Date().toISOString(),
                items: data.map(item => ({
                    foodName: item.foodName,
                    qty: item.qty,
                    size: item.size,
                    price: item.price
                })),
                totalPrice: totalPrice
            }]
        };

        const response = await fetch("http://localhost:5000/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json();
        
        if (json.success) {
            dispatch({ type: "DROP" });
            alert("Order Placed Successfully!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to place order");
    } finally {
        setLoading(false);
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="cart-modal">
      <div className="cart-content">
        {data.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-cart-x"></i>
            <h3>Your Cart is Empty</h3>
            <p>Add some delicious items to your cart!</p>
          </div>
        ) : (
          <>
            <div className="cart-header">
              <h4>Your Cart ({data.length} items)</h4>
            </div>

            <div className="cart-items">
              {data.map((food, index) => (
                <div key={index} className="cart-item">
                  <div className="item-info">
                    <h5>{food.foodName}</h5>
                    <div className="item-meta">
                      <span>Size: {food.size}</span>
                      <span>Qty: {food.qty}</span>
                      <span>₹{food.price}</span>
                    </div>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => dispatch({ type: "REMOVE", index: index })}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="price-summary">
                <div className="price-row">
                  <span>Total Amount</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
              <button 
                className="checkout-btn"
                onClick={handleCheckOut}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order • ₹' + totalPrice}
              </button>
            </div>
          </>
        )}
      </div>

      <style>
        {`
          .cart-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            max-height: 90vh;
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.2);
            z-index: 1000;
          }

          .cart-content {
            padding: 20px;
          }

          .cart-header {
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
            margin-bottom: 15px;
          }

          .cart-header h4 {
            margin: 0;
            font-weight: 600;
          }

          .cart-items {
            max-height: 50vh;
            overflow-y: auto;
            padding-right: 5px;
          }

          .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            margin-bottom: 10px;
            background: #f8f9fa;
            border-radius: 8px;
          }

          .cart-item:hover .delete-btn {
            opacity: 1;
          }

          .item-info {
            flex: 1;
          }

          .item-info h5 {
            margin: 0;
            font-size: 0.95rem;
            color: #2d3436;
          }

          .item-meta {
            display: flex;
            gap: 12px;
            margin-top: 4px;
            font-size: 0.85rem;
            color: #636e72;
          }

          .delete-btn {
            background: none;
            border: none;
            color: #dc3545;
            padding: 8px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.8;
          }

          .delete-btn:hover {
            transform: scale(1.1);
            opacity: 1;
            color: #dc3545;
          }

          .cart-footer {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #eee;
          }

          .price-summary {
            margin-bottom: 15px;
          }

          .price-row {
            display: flex;
            justify-content: space-between;
            font-weight: 600;
            font-size: 1.1rem;
          }

          .checkout-btn {
            width: 100%;
            padding: 12px;
            background: #FF5F6D;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s;
          }

          .checkout-btn:hover:not(:disabled) {
            background: #ff4757;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255,95,109,0.2);
          }
        `}
      </style>
    </div>
  );
}