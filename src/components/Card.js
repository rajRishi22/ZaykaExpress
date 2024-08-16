import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';


function Card(props) {
  const priceRef=useRef();
  let options = props.options;
  let priceOptions=Object.keys(options);
  let data=useCart();
  // console.log(props.foodName);
  // console.log(props.options);
  // console.log(props.id);
  const[qty,setQty]=useState('1');
  const[size,setSize]=useState("");
  let dispatch = useDispatchCart();
  const handleAddToCart = async () => {
    let food=[]
    for(const item of data){
      if(item.id===props.id){
        food=item;
        break;
      }
    }

    if(food!=[]){
      if(food.size===size){
        await dispatch({type:"UPDATE",id:props.id,price:finalPrice,qty:qty})
        return 
      }else if(food.size!==size){
        await dispatch({ type: "ADD", payload: { foodName: props.foodName,id:props.id, qty: qty, size: size, price: finalPrice } });
        return
       
      }
      return
    }
      await dispatch({ type: "ADD", payload: { foodName: props.foodName,id:props.id, qty: qty, size: size, price: finalPrice } });
    

   
  }
  let finalPrice=qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value);
  },[])

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
    
        <select className='m-2 h-100 bg-warning rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
          {priceOptions.map((data)=>{
            console.log(data);
            return <option key={data} value={data}>{data}</option>
          })}
        </select>
        <div className='d-inline h-100 fs-5'>
        Rs. {finalPrice}/-
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