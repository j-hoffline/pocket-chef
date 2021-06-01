import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import $ from 'jquery';

function AddRecipe(props) {
    const [error, setError] = useState("");
    const [instructionCount, setInstructionCount] = useState(0);
    const [ingredientCount, setIngredientCount] = useState(1);

    const history = useHistory();
    const currentUser = props.currentUser || {fullname: "Joe Bob"};

    const addIngredient = () => {
        $('#ingredients-field').append(
            `<div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Amount" aria-label="Amount" />
                <span class="input-group-text">/</span>
                <input type="text" class="form-control" placeholder="Ingredient and Preparation" aria-label="Ingredient"/>
            </div>`
        );
        setIngredientCount(ingredientCount + 1);
    }
    const addInstruction = (element) => {
        let newInstruction = $('#newInstructionField');
        if (newInstruction.val()) {
            $('#instructions-list').append(
                `<li class="list-group-item">
                    <input type="checkbox" className="input-checkbox"/>
                    ${newInstruction.val()}
                </li>`
            );
            newInstruction.val('');
            setInstructionCount(instructionCount + 1);
            console.log(instructionCount);
        }
    }

    const deleteInstructions = () => {
        $('#instructions-list li input').each(function(item) {
            if (this.checked) {
                this.parentNode.remove();
                setInstructionCount(instructionCount - 1);
            }
            console.log(instructionCount);
        });
    }

    const submitRecipe = (event) => {
        event.preventDefault();
        setError("");
        const date = new Date();
        const dateString = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

        const form = event.target.elements;

        //Validation
        if (form.course.value === "Not Selected") {
            $('#courseSelector').addClass('is-invalid');
            return;
        } 
        $('#ingredients-field input').each(function(instruction) {
            if (!this.value) { //If field is empty
                $(this).addClass('is-invalid');
                setError('Ingredient field cannot be left empty');
                return;
            }
        });

        if (error) {return;}

        //If no instructions have been added
        if (instructionCount === 0) {
            $('#newInstructionField').addClass('is-invalid');
            setError('At least one instruction is required');
            return;
        }

        //Prevent form from submitting if error is found
        if (!error) { 
            //Submission
            let recipeInfo = {
                dietaryPreferences: {
                        vegetarian: $('#vegetarian').is(':checked'),
                        vegan: $('#vegan').is(':checked'),
                        glutenFree: $('#glutenFree').is(':checked'),
                        dairyFree: $('#dairyFree').is(':checked'),
                        healthy: $('#healthy').is(':checked'),
                        cheap: $('#cheap').is(':checked'),
                        sustainable: $('#sustainable').is(':checked')
                    }, //Object of keys with boolean values Example: {vegetarian: false, vegan: true, etc.}
                recipeIngredients: [], //Array of objects with name of ingredient and amount Example: [{ingredient: 'tomato', amount: 2}, etc.]
                title: form.title.value, //Name of recipe
                likes: 0,
                reviews: [], //Array of objects with headline, review, and reviewer name Example: [{headline: 'Best pancakes ever', review: 'Would definitely make again', userName: 'Frank Jones'}]
                img: form.imageUrl.value || "https://www.clipartmax.com/png/middle/0-9963_fork-and-knife-plate-clipart.png", //Url string of recipe image (default)
                datePosted: dateString, //Date string of when recipe was posted
                servings: 1, //Number of servings detailed in recipe    
                overview: form.overview.value, //Author's note
                instructions: document.getElementById('instructions-list').outerHTML, //String of instructions in <ol> HTML format 
                tags: [], //Object of keys with boolean values for recipe tags Example {breakfast: false, lunch: false, fastToMake: true, etc.} 
                timeToCook: form.timeToCook.value,
                postedBy: currentUser.fullname
            };
    
            //Add tag strings 
            if (instructionCount < 7) {
                recipeInfo.tags.push('Easy to Make');

                switch (form.course.value) {
                    case "Breakfast":
                        recipeInfo.tags.push("Easy Breakfast");
                        break;
                    case "Lunch":
                        recipeInfo.tags.push("Easy Lunch");
                        break;
                    case "Dinner":
                        recipeInfo.tags.push("Easy Dinner");
                        break;
                    case "Snack":
                        recipeInfo.tags.push("Easy Snacks");
                        break;
                }
            }
            if (ingredientCount <= 5) {
                recipeInfo.tags.push('5 Ingredients or Less');
            }
            if (recipeInfo.timeToCook < "20 minutes" || recipeInfo.timeToCook < "20") {
                recipeInfo.tags.push('Ready within 20 Minutes');
            }
            $('#ingredients-field div').each(function(field) {
                let tempObj = {
                    amount: "",
                    ingredient: ""
                };
                let fields = this.children;
                for (let input of fields) {
                    if (input.id === 'amount') {
                        tempObj.amount = input.value;
                    } else if (input.id === 'ingredient-prep') {
                        tempObj.ingredient = input.value;
                    }
                }

                recipeInfo.recipeIngredients.push(tempObj);                
        });

            //Check recipe likes when editing recipe before submitting again
            console.log(recipeInfo);

            //Submit data to backend
            $.post('/node_add_recipe', recipeInfo).done((data) => {
                if (data.message === "success") {
                    //Display message in App.js?
                    console.log("recipe submitted successfully");
                    //Redirect to recipe detail page to show new recipe with url param recipe_id from backend
                    //post call
                    history.push('/');
                }
            });
        }
    }
    return(
        <div className="container">
            <h1 className="section-header">Share what you've been cooking!</h1>
            <form onSubmit={submitRecipe} method="POST">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" id="title" 
                            placeholder="What do you call your masterpiece?" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL: </label>
                        <input type="text" className="form-control" name="imageUrl" id="imageUrl" 
                            placeholder="https://spaghetti.jpg" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="overview">Overview: </label>
                        <textarea type="text" className="form-control" name="overview" id="overview" 
                            placeholder="What do you want to share about this creation?" style={{height: "100px"}} required></textarea>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-4">
                                <label className="visually-hidden" for="inlineFormSelectPref">Preference</label>
                                <select className="form-select" id="courseSelector" name="course" required>
                                <option value="Not Selected" selected>Course</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Snack">Snack</option>
                                <option value="Dinner">Dinner</option>
                                </select>
                                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                    Please choose a course for this dish.
                                </div>
                            </div>

                            <div className="col-4"><input name="servings" placeholder="Servings" className="input-group-number form-control"/></div>
                            <div className="col-4"><input name="timeToCook" placeholder="Time required" className="input-group form-control form-number"/></div>
                        </div>

                    </div>
                    <div className="form-group">
                    <h4>This meal is: </h4>
                    <div className="btn-group container-fluid" role="group" aria-label="Basic checkbox toggle button group" style={{width: "100%", justifyContent: "center"}}>
                        <div className="">
                        <input type="checkbox" class="btn-check" id="vegetarian" autocomplete="off" />
                        <label class="btn btn-outline-primary" for="vegetarian">Vegetarian</label>

                        <input type="checkbox" class="btn-check" id="vegan" autocomplete="off" />
                        <label class="btn btn-outline-primary" for="vegan">Vegan</label>

                        <input type="checkbox" class="btn-check" id="glutenFree" autocomplete="off" />
                        <label class="btn btn-outline-primary" for="glutenFree">Gluten Free</label>

                        <input type="checkbox" class="btn-check" id="dairyFree" autocomplete="off" />
                        <label class="btn btn-outline-primary" for="dairyFree">Dairy Free</label>

                        </div>
                        <div className="">
                        <input type="checkbox" class="btn-check" id="healthy" autocomplete="off" />
                        <label class="btn btn-outline-primary" for="healthy">Healthy</label>

                        <input type="checkbox" class="btn-check" id="cheap" autocomplete="off" />
                        <label class="btn btn-outline-primary" for="cheap">Cheap</label>

                        <input type="checkbox" class="btn-check" id="sustainable" autocomplete="off" />
                        <label class="btn btn-outline-primary" for="sustainable">Sustainable</label>
                        </div>
                        </div>
                    </div>
                    <div id="ingredients-field" className="form-group" style={{position: "relative", paddingBottom: "8%"}}>
                        <label >Ingredients: </label>
                        <div class="input-group mb-3">
                            <input id="amount" type="text" class="form-control" placeholder="Amount" aria-label="Amount" />
                            <span class="input-group-text">/</span>
                            <input id="ingredient-prep" type="text" class="form-control" placeholder="Ingredient and Preparation" aria-label="Ingredient"/>
                        </div>
                        <button type="button" className="align-self-right" onClick={addIngredient} 
                            style={{backgroundColor: "coral", borderRadius: "50%", border: "none", fontSize: "2em", width: "48px", height: "48px", position: "absolute", bottom: "0", right: "0", zIndex: "100"}}>+</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="instruction-input">Instructions: </label>
                        <div class="input-group mb-3">
                            <input id="newInstructionField" type="text" class="form-control" name="instruction-input" placeholder="Add Instruction" aria-label="Add Instruction" aria-describedby="button-addon2" />
                            <button type="button" class="btn btn-outline-primary" onClick={addInstruction}>Add</button>
                        </div>
                            <div class="card" style={{width: "100%", margin: "0"}}>
                                <div class="card-body">
                                    <div>
                                    <h4>Instructions: </h4> 
                                    <button className="btn btn-danger" type="button" style={{position: "absolute", right: "0", top: "2%"}} onClick={deleteInstructions}>Delete Selected</button>
                                    </div>
                                    <ol id="instructions-list" className="list-group list-group-flush"></ol>
                                </div>
                            </div>
                        </div>                        
                    

                    
                    <div style={{color: "red"}}><p>{error}</p></div>
                    <button type="submit" className="btn btn-success m-3">Submit Recipe</button>
                    <button type="button" className="btn btn-outline-danger m-3" 
                        onClick={()=>{
                            history.goBack();
                        }}>Cancel</button>
                </form>
        </div>
    );
}

export default AddRecipe;