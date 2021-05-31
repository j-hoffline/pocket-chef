import $ from "jquery"
import {useLocation, Link} from "react-router-dom";


function RecipeDetailPage() {
    const location = useLocation()
    const recipe = location.state.recipe

    let dietString = recipe.readyInMinutes + " minutes, " + recipe.servings + " servings, "

    recipe.diets.map(diet => {
            dietString += diet + ", "
        }
    )
    dietString = dietString.slice(0, -2)

    console.log(recipe)

    return (
        <div className="container">
                <div className="row">
                    <div className='col-xl-4 col-lg-4'>
                        <img src={recipe.image}/>
                    </div>
                    <div className="recipe_description col-xl-8 col-lg-8">
                        <h1>{recipe.title}</h1>
                        <h5>
                            {dietString}
                        </h5>
                        <div dangerouslySetInnerHTML={{__html: recipe.summary}}/>
                        <br/>
                    </div>
                </div>
                <div className="row inginst">
                    <div className="col-lg-4">
                        <h1>Ingredients</h1>
                        {recipe.extendedIngredients.map(ing => {
                            return (
                                <p className='ingredient_item'>
                                    {ing.original}
                                </p>
                            )
                        })}
                    </div>
                    <div className="col-lg-8">
                        <h1>Instructions</h1>
                        {
                            <p className='instructions'>
                                <div dangerouslySetInnerHTML={{__html: recipe.instructions}}/>
                            </p>
                        }
                    </div>
                </div>
        </div>

    )

}


export default RecipeDetailPage

// const cut_summary = res.summary
// console.log('HERE')
// console.log(indexes(res.summary, '.'))
//
// function indexes(source, find) {
//     console.log(source)
//     if (!source) {
//         return [];
//     }
//     if (!find) {
//         return source.split('').map(function(_, i) { return i; });
//     }
//     var result = [];
//     var i = 0;
//     while(i < source.length) {
//         if (source.substring(i, i + find.length) === find) {
//             result.push(i);
//             i += find.length;
//         } else {
//             i++;
//         }
//     }
//
//     const n = result.length
//     const index_to_remove_from = result[n-5]
//     const modified_source = source.slice(0, index_to_remove_from) + "."
//
//     return modified_source
// }