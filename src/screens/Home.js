import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
// import Caraousal from '../components/Caraousal';

function Home() {
  const [search,setSearch]=useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [currentText, setCurrentText] = useState(0);
  const texts = ["Delicious Food At Your Doorstep", "Quality You Can Trust", "Fast Delivery"];

  const loadData = async () => {

    let response = await fetch('http://localhost:5000/api/foodData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    response = await response.json();
    
    // Remove duplicates based on name
    const uniqueItems = Array.from(new Map(
      response[0].map(item => [item.name, item])
    ).values());
    
    setFoodItem(uniqueItems);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      
      <div style={{ position: 'relative' }}>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{
            maxHeight: '40vh',
            overflow: 'hidden',
            borderRadius: '15px',
            margin: '10px auto'
          }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active w-100 h-70">
              <div className="carousel-overlay"></div>
              <img src="burger.jpg" className="d-block w-100 h-70" alt="..." />
            </div>
            <div className="carousel-item active w-100 h-70" >
              <div className="carousel-overlay"></div>
              <img
                src="indian-thali.jpg"
                className="d-block w-100 h-70"
                alt="..."
              />
            </div>
            <div className="carousel-item active w-100 h-70">
              <div className="carousel-overlay"></div>
              <img src="bowl.jpg" className="d-block w-100 h-70" alt="..." />
            </div>
          </div>

          <div className="carousel-caption-custom">
            <h1 className="animated-text">
              {texts[currentText]}
            </h1>
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

        {/* Search bar positioned at bottom */}
        <div 
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            zIndex: 1000
          }}
        >
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => {setSearch(e.target.value)}}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '20px',
              padding: '10px 20px'
            }}
          />
        </div>
      </div>

      <div className='main-container'>
        {foodCat && foodCat.length !== 0 ? (
          foodCat.map((data) => {
            return (
              <div className='category-section' key={data._id}>
                <div className='category-header'>
                  <h2 className='category-title'>{data.CategoryName}</h2>
                  <div className='category-divider'></div>
                </div>
                <div className='row g-4'>
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
            );
          })
        ) : (
          <div>No categories found</div>
        )}
      </div>
      <Footer />

      <style>
        {`
          body {
            background: linear-gradient(135deg, #f6f9fc 0%, #f1f4f9 100%);
            position: relative;
            overflow-x: hidden;
          }

          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 50% 0%, rgba(255,95,109,0.03) 0%, transparent 70%),
                        radial-gradient(circle at 80% 50%, rgba(255,195,113,0.03) 0%, transparent 70%);
            pointer-events: none;
          }

          .main-container {
            padding: 2rem 4rem;
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .category-section {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            margin-bottom: 2.5rem;
            padding: 1.5rem;
            border: 1px solid rgba(255,255,255,0.7);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .category-section:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          }

          .category-header {
            position: relative;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
          }

          .category-title {
            font-family: 'Poppins', sans-serif;
            font-size: 2rem;
            font-weight: 600;
            background: linear-gradient(45deg, #2d3436 30%, #636e72 90%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
            padding: 1rem 0;
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .category-title::before {
            content: '';
            width: 6px;
            height: 35px;
            background: linear-gradient(180deg, #FF5F6D 0%, #FFC371 100%);
            border-radius: 3px;
          }

          @media (max-width: 768px) {
            .main-container {
              padding: 1rem;
            }
            
            .category-title {
              font-size: 1.5rem;
            }
          }

          .carousel-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1;
          }
          .carousel-caption-custom {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            width: 100%;
            text-align: center;
          }
          .animated-text {
            color: white;
            font-size: 2.5rem;
            font-weight: bold;
            animation: fadeIn 3s ease-in;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
}

export default Home;
