import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

function Carousel() {
    const [featuredArticles, setFeatArticles] = useState([]);

    //If articles are not loaded, make call to database and store data
    useEffect(() => {
        if (featuredArticles.length == 0) {
            $.get('/node_get_all_articles').done((data) => {
                if (data.message === "success") {
                    setFeatArticles(data.data);
                }
            });
        }
    });

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
                {featuredArticles.map((feature, idx) => {
                    if (idx > 2) {return;}
                    return(
                    <div className={idx === 0 ? "carousel-item active" : "carousel-item"}>
                        <Link to={{pathname: '/article', state: {article: feature}}}>
                        <img src={feature.image} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>{feature.title}</h3>
                        </div>
                        </Link>
                    </div>
                    );
                })}
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