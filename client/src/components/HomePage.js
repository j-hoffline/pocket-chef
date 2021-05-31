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

let recipes = [{img: 'https://assets.epicurious.com/photos/594bff7eaedda61b72c18987/1:1/w_1600%2Cc_limit/THREE-INGREDIENT-HERB-Chicken-Wings-20062017-003.jpg', name: '3-Ingredient Garlic-Herb Grilled Chicken Wings'}, 
{img: 'https://assets.epicurious.com/photos/5b770caff1ff6a661bb16346/1:1/w_1600%2Cc_limit/Should-I-Be-Using-Grilling-Planks-2-16082018.jpg', name: 'Cedar-Plank Salmon'},
{img: 'https://assets.epicurious.com/photos/5ef4fb30153ff3ffeeceb6b2/1:1/w_1600%2Cc_limit/GrilledTrumpetMushroomToasts_HERO_2_062420_8946.jpg', name: 'Open-Face Mushroom Sandwiches With Pecorino Salsa'},
{img: 'https://assets.epicurious.com/photos/5d151cf3e2bb770008bcbdff/1:1/w_1600%2Cc_limit/chicken-caesar-sandwich-recipe-BA-062719.jpg', name: 'Grilled Chicken Caesar Sandwiches'}];

function HomePage() {
    return(
        <div className="" style={{position: "relative", maxHeight: "10vh", height:"120px"}}>
            <Carousel />
            <section id="cuisine-cards" className="container row align-center" style={{overflow: "hidden", maxHeight: "350px"}}>
                <h2 className="section-header">What cuisine are you looking for?</h2>
                <div style={{width: "100%", whiteSpace: "nowrap", overflowX: "scroll"}}>
                        {cuisines.map((cuisine) => {
                            return( //EACH CARD SHOULD ALSO LINK TO SEARCH PAGE
                                <div class="card cuisine-card col-lg-2 col-md-3 col-sm-4 text-center">
                                    <img src={cuisine.img} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{cuisine.type}</h5>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            </section>
            <section id="popular-recipes">
                <h2 className="section-header">Popular Recipes</h2>
                <div className="container">
                    <div className="row" style={{justifyContent: "center"}}>
                        {recipes.map((recipe, idx) => {
                            return(
                                <div class="card mb-3" style={{maxWidth: "75%"}}>
                                    <a href={"/recipes?recipe_id=" + idx}>
                                <div class="row g-0">
                                  <div class="col-md-4">
                                    <img src={recipe.img} alt="" />
                                  </div>
                                  <div class="col-md-8">
                                    <div class="card-body">
                                      <h5 class="card-title">{recipe.name}</h5>
                                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                      <p class="card-text"><small class="text-muted">Author</small></p>
                                    </div>
                                  </div>
                                </div>
                                </a>
                              </div>
                                
                                    // <div id={idx} className="col-6 recipe-card">
                                    //     <a href={"/recipe?recipe_id=" + idx}>
                                    //         <img src={recipe.img}/>
                                    //         <div className="article-card-text">
                                    //             <h4>{recipe.name}</h4>
                                    //         </div>
                                    //     </a>
                                    // </div>
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