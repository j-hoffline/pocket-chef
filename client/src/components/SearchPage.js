import background from './images/search.jpg';
import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import $ from 'jquery';

let recipes = []


function clearButton() {
    $('.form-check-input').prop("checked", false)
}

function SetUpRecipes() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [allRecipes, setAllRecipes] = useState([])

    useEffect(() => {
        if (!isLoaded) {
            $.getJSON('/node_get_all_recipes').done(function (json) {
                if (json.message === 'success') {
                    setAllRecipes(json.data)
                    setIsLoaded(true)
                } else {
                    setError(json.message)
                }
            })
        }
    })


    recipes = allRecipes
    return recipes
}

function ShowList(props) {
    let reclist = props.reclist
    console.log('----------')
    console.log(reclist)

    return (
        <div className='search_content col-md-12' id="search_content">
            <div className='row'>
                {
                    reclist.map(
                        function (recipe) {
                            return (
                                <div className='col-lg-3 col-md-4 col-sm-6'>
                                    <Link to={{
                                        pathname: "/recipe_detail",
                                        state: {recipe: recipe}
                                    }}>
                                        <div className="card" style={{width: "100%", marginTop: "10px"}}>
                                            <img className="card-img-top" src={recipe.img} alt="Card image cap"/>
                                            <div className="card-body text-wrap">
                                                <h7 className="card-title ">{recipe.title}</h7>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

function ex(data) {
    $("#search_content").append("<div class='row search_row'></div>")


    for (let i = 0; i < data.length; i++) {
        let recipe = data[i]


        $('.search_row').append(`
            <div class='col-lg-3 col-md-4 col-sm-6 each_rec'>
                <a href="/recipe_detail?rec_title=${recipe.title}">
                    <div class="card" style="width: 100%, marginTop: 10px">
                                            <img class="card-img-top" src=${recipe.img} alt="Card image cap"/>
                                            <div class="card-body text-wrap">
                                                <h7 class="card-title ">${recipe.title}</h7>
                                            </div>
                                        </div>
                                    </a>
            </div>`)
    }
}


function showSearchedList(search_key) {
    let searched_recipes = []
    console.log(recipes[2])

    $('.search_content').empty()

    $.get('/get_recipes_by_filters', {
        search_key: $('#search_box').val()
    }).done((data) => {
        if (data.message === "success") {
            searched_recipes = data.data
            ex(data.data)

        }
    })
}

function SearchPage() {
    SetUpRecipes()

    return (
        <div className='container'>

            <div className='search_div'>
                <div className="input-group search_form ">
                    <input id="search_box" type="search" className="form-control" placeholder="Search recipes..."
                           aria-label="Search"
                           aria-describedby="basic-addon2"
                           onSearch={showSearchedList}/>
                    <span className="input-group-text" id="basic-addon2" onClick={showSearchedList}>
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>

            <div className="filtcont_div row">
                {/*<div className='filter_info col-md-2 form-group'>*/}
                {/*    /!*<div className='filter_layout'>*!/*/}
                {/*    /!*    <h4>Advanced Search</h4>*!/*/}

                {/*    /!*    <div className="filter_title">Diets</div>*!/*/}
                {/*    /!*    <div className="">*!/*/}
                {/*    /!*        <div className="form-check">*!/*/}
                {/*    /!*            <input className="form-check-input" type="checkbox" id="gridCheck1"/>*!/*/}
                {/*    /!*            <label className="form-check-label" for="gridCheck1">gluten free</label>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className="form-check">*!/*/}
                {/*    /!*            <input className="form-check-input" type="checkbox" id="gridCheck2"/>*!/*/}
                {/*    /!*            <label className="form-check-label" htmlFor="gridCheck2">vegetarian</label>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className="form-check">*!/*/}
                {/*    /!*            <input className="form-check-input" type="checkbox" id="gridCheck3"/>*!/*/}
                {/*    /!*            <label className="form-check-label" htmlFor="gridCheck3">vegan</label>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className="form-check">*!/*/}
                {/*    /!*            <input className="form-check-input" type="checkbox" id="gridCheck4"/>*!/*/}
                {/*    /!*            <label className="form-check-label" htmlFor="gridCheck4">dairy free</label>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*    </div>*!/*/}

                {/*    /!*    <div className="filter_title">Meal types</div>*!/*/}
                {/*    /!*    <div className="">*!/*/}
                {/*    /!*        <div className="form-check">*!/*/}
                {/*    /!*            <input className="form-check-input" type="checkbox" id="gridCheck5"/>*!/*/}
                {/*    /!*            <label className="form-check-label" htmlFor="gridCheck5">breakfast</label>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className="form-check">*!/*/}
                {/*    /!*            <input className="form-check-input" type="checkbox" id="gridCheck6"/>*!/*/}
                {/*    /!*            <label className="form-check-label" htmlFor="gridCheck6">lunch</label>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className="form-check">*!/*/}
                {/*    /!*            <input className="form-check-input" type="checkbox" id="gridCheck7"/>*!/*/}
                {/*    /!*            <label className="form-check-label" htmlFor="gridCheck7">dinner</label>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*        <div className="form-check">*!/*/}
                {/*    /!*            <input className="form-check-input" type="checkbox" id="gridCheck8"/>*!/*/}
                {/*    /!*            <label className="form-check-label" htmlFor="gridCheck8">dessert</label>*!/*/}
                {/*    /!*        </div>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*    /!*    <div>*!/*/}
                {/*    /!*        <button type="button" className="btn btn-primary btn-sm">Apply</button>*!/*/}
                {/*    /!*        <button type="button" className="btn btn-secondary btn-sm" onClick={clearButton}>Clear*!/*/}
                {/*    /!*        </button>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*    /!*</div>*!/*/}
                {/*</div>*/}
                <ShowList reclist={recipes}/>
            </div>
        </div>
    );

}

export default SearchPage