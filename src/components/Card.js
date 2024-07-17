import React from 'react'
function Card(props) {
  let options = props.options;
  let priceOptions=Object.keys(options);
  return (
    <div>
    <div className="card m-2 p-2" style={{"width": "20rem","background":"#FFBB5C"}}>
    
    <img src={props.imgSrc} className="card-img-top" alt="..." style={{height:"140px",objectFit:"fill"}} />
      <div className="card-body">  
        
         <h5 className="card-title">{props.foodName}</h5>
        
      </div>
      <div className="container w-100">
        <select className='m-2 h-100  bg-warning rounded'>
          {Array.from(Array(6),(e,i)=>{
            return <option key={i} value={i+1}>{i+1}</option>
          })}
        </select>
    
        <select className='m-2 h-100 bg-warning rounded'>
          {priceOptions.map((data)=>{
            console.log(data);
            return <option key={data} value={data}>{data}</option>
    
          })}
        </select>
        <div className='d-inline h-100 fs-5'>
          Total Price
        </div>
      </div>
    </div>
    </div>
  )
}

export default Card