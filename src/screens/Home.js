import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/carousel';
import Signup from './Signup';
import Cart from '../screens/Cart.js'

function Home() {
    const [search, setSearch]=useState('');
    const [foodCat, setFoodCat] = useState([]); // Initialize foodCat as an empty array
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();

                setFoodItem(data.food); // Set foodItem state
                setFoodCat(data.fooditems); // Set foodCat state

                console.log(data.food, data.fooditems);
            } else {
                console.error('Request failed');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div><Navbar /></div>
            <div>
            
            
            
            
            
            
            
            
            <div id="carouselExampleCaptions" className="carousel slide carousel-w" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner" id="carouselq" >
          <div className="carousel-item active">
            <div className="d-block w-100 carousel-image">
              <img src="https://c4.wallpaperflare.com/wallpaper/575/346/505/cheeseburger-hamburger-sandwich-snack-food-wallpaper-preview.jpg" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-caption d-none d-md-block">

              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={ (e )=>{setSearch(e.target.value)} } />
                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
              </div>

            </div>
          </div>
          <div className="carousel-item">
            <div className="d-block w-100 carousel-image">
              <img src="https://c4.wallpaperflare.com/wallpaper/234/543/684/food-pizza-wallpaper-preview.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-caption d-none d-md-block">

            <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={ (e )=>{setSearch(e.target.value)} } />
                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
              </div>


            </div>
          </div>
          <div className="carousel-item">
          <div className="d-block w-100 carousel-image">
            <img src="https://c4.wallpaperflare.com/wallpaper/119/629/183/food-doughnut-bun-breakfast-wallpaper-preview.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>

            <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={ (e )=>{setSearch(e.target.value)} } />
                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
              </div>

            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
            
            
            
            
            
            
            
            
            
            
            
            
            
            </div>
            <div className='container'>
        {foodCat.length === 0
          ? <div>"No data available."</div>
          : foodCat.map((data) => {
            const filteredFoodItems = foodItem.filter(
              (item) =>
                item.CategoryName === data.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
            );

            if (filteredFoodItems.length === 0) {
              return (
                <div key={data.id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
              );
            }

            return (
              <div key={data.id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                <div className="row mb-3">
                  {filteredFoodItems.map((filterItems) => (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 m-3 col-lg-3"
                    >
                      <Card foodItem={filterItems} options={filterItems.options[0]} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
      <div><Footer /></div>
    
    </div>
  );
}

export default Home;