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
    <div className="card-container">
      <div className="card" style={{
        width: "300px",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        border: "none",
        backgroundColor: "#fff",
        transition: "transform 0.2s",
        margin: "15px"
      }}>
        {/* Image Container */}
        <div style={{ position: "relative" }}>
          <img 
            src={props.imgSrc} 
            className="card-img-top" 
            alt="..." 
            style={{
              height: "200px",
              objectFit: "cover",
              width: "100%"
            }}
          />
          <div className="rating-badge" style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            backgroundColor: "white",
            padding: "4px 8px",
            borderRadius: "8px",
            fontSize: "0.9rem"
          }}>
            <span style={{ color: "#ffa700" }}>★</span> 4.2
          </div>
        </div>

        {/* Content Container */}
        <div className="card-body" style={{ padding: "15px" }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title" style={{ 
              margin: "0",
              fontSize: "1.1rem",
              fontWeight: "600"
            }}>{props.foodName}</h5>
            <span className="text-muted" style={{ fontSize: "0.9rem" }}>20-25 mins</span>
          </div>

          {/* Options Container */}
          <div className="mt-3" style={{ 
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <select 
              className='form-select form-select-sm' 
              style={{ width: "80px" }}
              onChange={(e)=>setQty(e.target.value)}
            >
              {Array.from(Array(6),(e,i)=>(
                <option key={i} value={i+1}>{i+1}</option>
              ))}
            </select>

            <select 
              className='form-select form-select-sm' 
              style={{ width: "100px" }}
              ref={priceRef} 
              onChange={(e)=>setSize(e.target.value)}
            >
              {priceOptions.map((data)=>(
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
          </div>

          {/* Price and Add Button */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="price" style={{ 
              fontSize: "1.1rem", 
              fontWeight: "600" 
            }}>
              ₹{finalPrice}
            </div>
            <button 
              className="add-btn" 
              onClick={handleAddToCart}
              style={{
                cursor: "pointer",
                backgroundColor: "#00b894",
                color: "white",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "0.9rem",
                border: "none",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease"
              }}
            >
              Add +
              <style>
                {`
                  .add-btn {
                    position: relative;
                    overflow: hidden;
                  }
                  
                  .add-btn:active {
                    transform: scale(0.95);
                    background-color: #00a885;
                  }

                  .add-btn::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    transition: transform 0.3s ease;
                  }

                  .add-btn:active::after {
                    transform: translate(-50%, -50%) scale(2);
                    opacity: 0;
                  }

                  .add-btn:hover {
                    background-color: #00c9a7;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                  }
                `}
              </style>
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          .card:hover {
            transform: translateY(-5px);
          }
          .form-select {
            border: 1px solid #dfe6e9;
            border-radius: 8px;
          }
          .form-select:focus {
            border-color: #00b894;
            box-shadow: none;
          }
        `}
      </style>
    </div>
  )
}

export default Card