import React from 'react';
import Img1 from "./images/carousel/mealplanning.jpg";
import Img2 from "./images/carousel/cooking.jpg";
import Img3 from "./images/carousel/couple-cooking.jpg";

let imgArr = [
    {
        img: Img1,
        title: "Mealplanning - How to get started",
        description: "Tips and Tricks on planning your meals"
    },
    {
        img: Img2,
        title: "Cooking for Beginners",
        description: "Learning how to cook? Here's how to get started."
    }, 
    {
        img: Img3,
        title: "Reigniting Your Family's Love of Cooking",
        description: "Time to dust off the dinner table."
    },
];

function Carousel() {
    return(
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" >
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                        className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                {imgArr.map((feature, idx) => {
                    return(
                    <div className={idx === 0 ? "carousel-item active" : "carousel-item"}>
                        <img src={feature.img} className="d-block" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h4>{feature.title}</h4>
                            <p>{feature.description}</p>
                        </div>
                    </div>);
                })}
                {/* <div className="carousel-item active">
                    <img src={Img1} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={Img2} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={Img3} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                </div> */}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;