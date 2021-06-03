import background from './images/search.jpg';
import {Link} from "react-router-dom";
import $ from 'jquery';

const recipe_100 = require('./recipes100.json')


function clearButton() {
    $('.form-check-input').prop("checked", false)
}

function SearchPage() {
    return (
        <div className='container'>
            <div className='search_div'>
                <div className="input-group search_form ">
                    <input id="search_box" type="search" className="form-control" placeholder="Search recipes..."
                           aria-label="Search"
                           aria-describedby="basic-addon2"/>
                    <span className="input-group-text" id="basic-addon2">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>
            <div className="filtcont_div row">
                <div className='filter_info col-md-3 form-group'>
                    <div className='filter_layout'>
                        <h4>Advanced Search</h4>

                        <div className="filter_title">Diets</div>
                        <div className="">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck1"/>
                                <label className="form-check-label" for="gridCheck1">gluten free</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck2"/>
                                <label className="form-check-label" htmlFor="gridCheck2">vegetarian</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck3"/>
                                <label className="form-check-label" htmlFor="gridCheck3">vegan</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck4"/>
                                <label className="form-check-label" htmlFor="gridCheck4">dairy free</label>
                            </div>
                        </div>

                        <div className="filter_title">Meal types</div>
                        <div className="">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck5"/>
                                <label className="form-check-label" htmlFor="gridCheck5">breakfast</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck6"/>
                                <label className="form-check-label" htmlFor="gridCheck6">lunch</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck7"/>
                                <label className="form-check-label" htmlFor="gridCheck7">dinner</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck8"/>
                                <label className="form-check-label" htmlFor="gridCheck8">dessert</label>
                            </div>
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary btn-sm">Apply</button>
                            <button type="button" className="btn btn-secondary btn-sm" onClick={clearButton}>Clear
                            </button>
                        </div>
                    </div>
                </div>
                <div className='search_content col-md-9'>
                    <div className='row'>
                        {
                            recipe_100.recipes.map(
                                function (recipe) {
                                    return (
                                        <div className='col-lg-3 col-md-4 col-sm-6'>
                                            <Link to={{
                                                pathname: "/recipe_detail",
                                                state: {recipe: recipe}
                                            }}>
                                            <div className="card" style={{width: "100%", marginTop: "10px"}}>
                                                <img className="card-img-top" src={recipe.image} alt="Card image cap"/>
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

            </div>

        </div>
    );

}

export default SearchPage