<<<<<<< HEAD
import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react';
import $ from 'jquery';

let popular_recs = []
let fast_recs = []
let less_ingr_recs = []
let gluten_recs = []
let veg_recs = []
let easy_dinner_recs = []
let dessert_recs = []

let section_names = ['Popular Recipes', 'Ready within 30 Minutes', '7 Ingredients or Less', 'Gluten-Free Recipes', 'Vegetarian Recipes', 'Easy Dinner Recipes', 'Desserts']
let section_values = [popular_recs, fast_recs, less_ingr_recs, gluten_recs, veg_recs, easy_dinner_recs, dessert_recs]


function SetUpRecipes() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        if (!isLoaded) {
            $.getJSON('/node_get_all_recipes').done(function (json) {
                if (json.message === 'success') {
                    setRecipes(json.data)
                    setIsLoaded(true)
                } else {
                    setError(json.message)
                }
            })
        }
    })

    popular_recs = recipes.sort((a, b) => (a.likes > b.likes ? -1 : 1)).slice(0, 10)
    fast_recs = recipes.sort((a, b) => (parseInt(a.timeToCook) < parseInt(b.timeToCook) ? -1 : 1)).slice(0, 8)
    less_ingr_recs = recipes.filter((rec) => {
        if (rec.recipeIngredients.length < 8) {
            return rec
        }
    })
    gluten_recs = recipes.filter((rec) => {
        if (rec.dietaryPreferences['glutenFree'] === true) {
            return rec
        }
    })
    veg_recs = recipes.filter((rec) => {
        if (rec.dietaryPreferences['vegan'] === true) {
            return rec
        }
    })
    easy_dinner_recs = recipes.filter((rec) => {
        if (rec.recipeIngredients.length < 8 && rec.tags.includes('dinner')) {
            return rec
        }
    })

    dessert_recs = recipes.filter((rec) => {
        if (rec.tags.includes('dessert')) {
            return rec
        }
    })

    section_values = [popular_recs, fast_recs, less_ingr_recs, gluten_recs, veg_recs, easy_dinner_recs, dessert_recs]


    return recipes
}

function RecipesPage() {
    SetUpRecipes()
    return (
        <div className="container">
            {
                section_names.map((name, i) => {
                    return (
                        <div>
                            <div className="title">
                                <h3>{name}</h3>
                            </div>
                            <div className="container-fluid">
                                <div className="row flex-row flex-nowrap"
                                     style={{width: "100%", whiteSpace: "nowrap", overflowX: "scroll"}}>
                                    {
                                        section_values[i].map((rec) => {

                                            return (
                                                <div className="col-xl-3 col-lg-4 col-sm-6 col-12" >
                                                    <Link to={{
                                                        pathname: "/recipe_detail",
                                                        state: {recipe: rec}
                                                    }}>

                                                        <div className="card" style={{width: "100%"}}>
                                                            <img className="card-img-top" src={rec.img}
                                                                 alt="Card image cap"/>
                                                            <div className="card-body text-wrap">
                                                                <h6 className="card-title">{rec.title}</h6>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>

                    )
                })
            }

        </div>
    )
}

export default RecipesPage
=======
import recipes_main_img from "./images/recipe-main.png";
import Italian from './images/cuisines/italian.jpg';
import American from './images/cuisines/american.jpg';
import Greek from './images/cuisines/greek.jpg';
import Uzbek from './images/cuisines/uzbek.jpg';
import {Link} from 'react-router-dom'


const recipe_100 = require('./recipes100.json')
const section_names = ['Popular Recipes', 'Ready within 20 Minutes', '5 Ingredients or Less', 'Gluten-Free RecipesPage', 'Vegetarian RecipesPage', 'Easy Dinner RecipesPage', 'Easy Chicken RecipesPage']
let cuisines = [{img: Italian, type: 'Italian'}, {img: American, type: 'American'}, {
    img: Greek,
    type: 'Greek'
}, {img: Uzbek, type: 'Uzbek'},
    {
        img: 'https://thumbs.dreamstime.com/b/buckwheat-noodles-beef-eggs-vegetables-korean-food-buckwheat-noodles-beef-eggs-vegetables-korean-food-buckwheat-116705882.jpg',
        type: 'Korean'
    },
    {img: 'https://ychef.files.bbci.co.uk/624x351/p07cj8zj.jpg', type: 'Indian'}];

const popular_recs = recipe_100.recipes.slice(1, 11)
const fast_recs = recipe_100.recipes.slice(12, 22)
const less_ingr_recs = recipe_100.recipes.slice(23, 33)
const gluten_recs = recipe_100.recipes.slice(34, 44)
const veg_recs = recipe_100.recipes.slice(45, 55)
const easy_dinner_recs = recipe_100.recipes.slice(56, 66)
const easy_chicken_recs = recipe_100.recipes.slice(67, 77)

const section_values = [popular_recs, fast_recs, less_ingr_recs, gluten_recs, veg_recs, easy_dinner_recs, easy_chicken_recs]

function RecipesPage() {
    return (
        <div className="container">
            {
                section_names.map((name, i) => {
                    return (
                        <div>
                            <div className="title">
                                <h3>{name}</h3>
                            </div>
                            <div className="container-fluid">
                                <div className="row flex-row flex-nowrap"
                                     style={{width: "100%", whiteSpace: "nowrap", overflowX: "scroll"}}>
                                    {
                                        section_values[i].map((rec) => {
                                            return (
                                                <div className="col-xl-3 col-lg-4 col-sm-6 col-12">
                                                    <Link to={{
                                                        pathname: "/recipe_detail",
                                                        state: {recipe: rec}
                                                    }}>

                                                    <div className="card" style={{width: '15rem'}}>
                                                        <img className="card-img-top" src={rec.image}
                                                             alt="Card image cap"/>
                                                        <div className="card-body text-wrap">
                                                            <h6 className="card-title">{rec.title}</h6>
                                                        </div>
                                                    </div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
            
                                </div>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default RecipesPage
>>>>>>> 9cb6620d2fbadeb73b8f82ac561347dc021f023e
