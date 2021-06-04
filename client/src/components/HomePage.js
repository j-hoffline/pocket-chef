import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import Carousel from './Carousel';
import Italian from './images/cuisines/italian.jpg';
import American from './images/cuisines/american.jpg';
import Greek from './images/cuisines/greek.jpg';
import Uzbek from './images/cuisines/uzbek.jpg';

//Cuisine cards with link to search page
let cuisines = [{img: Italian, type: 'Italian'}, {img: American, type: 'American'}, {img: Greek, type: 'Greek'}, {img: Uzbek, type: 'Uzbek'}, 
    {img: 'https://thumbs.dreamstime.com/b/buckwheat-noodles-beef-eggs-vegetables-korean-food-buckwheat-noodles-beef-eggs-vegetables-korean-food-buckwheat-116705882.jpg', type: 'Korean'},
    {img: 'https://ychef.files.bbci.co.uk/624x351/p07cj8zj.jpg', type: 'Indian'}];

function HomePage() {
    const [featuredRecipes, setFeatRecipes] = useState([]);

    //Call to database to feature 10 recipes
    useEffect(() => {
        if (featuredRecipes.length == 0) {
            $.get('/node_get_all_recipes').done((data) => {
                if (data.message === "success") {
                    setFeatRecipes(data.data);
                }
            });
        }
    });    

    return(
        <div>
            <Carousel /> {/*Carousel Component with featured articles */}
            <section id="cuisine-cards" className="container row align-center" style={{overflow: "hidden", maxHeight: "350px"}}>
                <h2 className="section-header">What cuisine are you looking for?</h2>
                <div style={{width: "100%", whiteSpace: "nowrap", overflowX: "scroll"}}>
                        {cuisines.map((cuisine) => {
                            return(
                                <div class="card cuisine-card col-lg-2 col-md-3 col-sm-4 text-center">
                                    <Link to="/search">
                                    <img src={cuisine.img} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{cuisine.type}</h5>
                                    </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
            </section>
            <section id="popular-recipes">
                <h2 className="section-header">Popular Recipes</h2>
                <div className="container">
                    <div className="row" style={{justifyContent: "center"}}>
                        {featuredRecipes.map((recipe, idx) => {
                            if (idx > 10) {return;}
                            return(
                                <div key={idx} class="card mb-3" style={{maxWidth: "75%"}}>
                                    <Link to={{pathname: '/recipe_detail', state: {recipe: recipe}}}>
                                <div class="row g-0">
                                  <div class="col-md-4">
                                    <img src={recipe.img || "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.dirtyapronrecipes.com%2Fwp-content%2Fuploads%2F2015%2F10%2Ffood-placeholder.png&f=1&nofb=1"} alt="" />
                                  </div>
                                  <div class="col-md-8">
                                    <div class="card-body">
                                      <h5 class="card-title">{recipe.title}</h5>
                                      <p class="card-text">{recipe.overview.split(". ")[0]}</p>
                                      <p class="card-text"><small class="text-muted">{recipe.author}</small></p>
                                    </div>
                                  </div>
                                </div>
                                </Link>
                              </div>
                            );
                        })
                        }  
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;