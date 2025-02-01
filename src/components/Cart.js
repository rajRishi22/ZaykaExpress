import React, { useState } from 'react'

import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [loading, setLoading] = useState(false);

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>  
      </div>
    )
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

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover bg-white	'>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.foodName}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                  Delete
                    </button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} disabled={loading}> {loading ? "Processing..." : "Check Out"} </button>
        </div>
      </div>



    </div>
  )
}