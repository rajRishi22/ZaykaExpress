import React from "react";

function Caraousal() {
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active w-100 h-70">
            <img src="burger.jpg" className="d-block w-100 h-70" alt="..." style={{height:"70vh",objectFit:"fill"}} />
            <div className="carousel-caption ">
              <form className="d-flex my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="carousel-item active w-100 h-70">
            <img
              src="indian-thali.jpg"
              className="d-block w-100 h-70"
              alt="..."
              style={{height:"70vh",objectFit:"fill"}}
            />
            <div className="carousel-caption ">
              <form className="d-flex my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="carousel-item active w-100 h-70">
            <img src="bowl.jpg" className="d-block w-100 h-70" alt="..." style={{height:"70vh",width:"100vw"}}/>
            <div className="carousel-caption ">
              <form className="d-flex my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
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
    </div>
  );
}

export default Caraousal;
