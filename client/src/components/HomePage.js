import React from 'react';
import Carousel from './Carousel';
import Italian from './images/cuisines/italian.jpg';
import American from './images/cuisines/american.jpg';
import Greek from './images/cuisines/greek.jpg';
import Uzbek from './images/cuisines/uzbek.jpg';

//Add 'link' property to link to search page with appropriate filter in url?
let cuisines = [{img: Italian, type: 'Italian'}, {img: American, type: 'American'}, {img: Greek, type: 'Greek'}, {img: Uzbek, type: 'Uzbek'}, 
    {img: 'https://thumbs.dreamstime.com/b/buckwheat-noodles-beef-eggs-vegetables-korean-food-buckwheat-noodles-beef-eggs-vegetables-korean-food-buckwheat-116705882.jpg', type: 'Korean'},
    {img: 'https://ychef.files.bbci.co.uk/624x351/p07cj8zj.jpg', type: 'Indian'}];

function HomePage() {
    return(
        <div className="" style={{position: "relative", maxHeight: "10vh", height:"120px"}}>
            <Carousel />
            <section id="cuisine-cards" className="container row align-center" style={{overflow: "hidden", maxHeight: "350px"}}>
                <h2 className="section-header">What cuisine are you looking for?</h2>
                <div style={{width: "100%", whiteSpace: "nowrap", overflowX: "scroll"}}>
                        {cuisines.map((cuisine) => {
                            return(
                                <div class="card text-center">
                                    <img src={cuisine.img} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{cuisine.type}</h5>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            </section>
            <section>
                <h2 className="section-header">Popular Recipes</h2>
            </section>
        </div>
    );
}

export default HomePage;