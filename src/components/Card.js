import React, { useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';


function Card(props) {
  
  let options = props.options;
  let priceOptions=Object.keys(options);
  console.log(props.foodName);
  console.log(props.options);
  console.log(props.id);
  const[qty,setQty]=useState(1);
  const[size,setSize]=useState("");
  let dispatch = useDispatchCart();
  const handleAddToCart = async () => {
    await dispatch({ type: "ADD", payload: { foodName: props.foodName,id:props.id, qty: qty, size: size, price: props.options[size] } });
  }


  return (
    <div>
    <div className="card m-2 p-2" style={{"width": "20rem","background":"#FFBB5C"}}>
    
    <img src={props.imgSrc} className="card-img-top" alt="..." style={{height:"140px",objectFit:"fill"}} />
      <div className="card-body">  
        
         <h5 className="card-title">{props.foodName}</h5>
        
      </div>
      <div className="container w-100">
        <select className='m-2 h-100  bg-warning rounded' onChange={(e)=>setQty(e.target.value)}>
          {Array.from(Array(6),(e,i)=>{
            return <option key={i} value={i+1}>{i+1}</option>
          })}
        </select>
    
        <select className='m-2 h-100 bg-warning rounded' onChange={(e)=>setSize(e.target.value)}>
          {priceOptions.map((data)=>{
            console.log(data);
            return <option key={data} value={data}>{data}</option>
    
          })}
        </select>
        <div className='d-inline h-100 fs-5'>
          Total Price
        </div>
      </div>
      <hr></hr>
      <div className="container w-100">
        <button className="btn btn-primary m-2" onClick={handleAddToCart}>Add to Cart</button>
      </div>

    </div>
    </div>
  )
}

export default Card