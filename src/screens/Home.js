import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
// import Caraousal from '../components/Caraousal';

function Home() {
  const [search,setSearch]=useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {

    let response = await fetch('https://zayka-express-evl9.vercel.app/api/foodData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat([...foodCat, ...response[1]]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active w-100 h-70">
            <img src="burger.jpg" className="d-block w-100 h-70" alt="..." />
            <div className="carousel-caption ">
              <div className="d-flex my-2 my-lg-0 justify-content-center">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
                
              </div>
            </div>
          </div>
          <div className="carousel-item active w-100 h-70">
            <img
              src="indian-thali.jpg"
              className="d-block w-100 h-70"
              alt="..."
            />
            <div className="carousel-caption ">
              <div className="d-flex my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
                
              </div>
            </div>
          </div>
          <div className="carousel-item active w-100 h-70">
            <img src="bowl.jpg" className="d-block w-100 h-70" alt="..." />
            <div className="carousel-caption ">
              <div className="d-flex my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
                
                
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>


      <div className='container'>
        { foodCat && foodCat.length !== 0 ? (
          foodCat.map((data) => {
            return (
              <div className='mb-3' key={data._id}>
                <div className='fs-3 m-3'>
                  {data.CategoryName}
                  <hr />
                  <div className='row'>
                    {foodItem.length !== 0 ? (
                      foodItem
                        .filter( (item) => (item.CategoryName === data.CategoryName)  && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                        .map((filterItems) => {
                          return (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mb-4'>
                              <Card 
                              id={filterItems._id}
                              foodName={filterItems.name} 
                              options={filterItems.options[0]}
                              imgSrc={filterItems.img}
                              />
                            </div>
                          );
                        })
                    ) : (
                      <div>No such data found</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No categories found</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
