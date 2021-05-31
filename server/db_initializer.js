var faker = require('faker');

const mongoose = require('mongoose');
const fs = require('fs');
const rawdata = fs.readFileSync(__dirname + "/recipes100.json");
jsonObject = JSON.parse(rawdata);
const date = new Date();
const dateString = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;


//console.log(jsonObject.recipes[50]);
let recipesArr = jsonObject.recipes.map(recipe => {
    return({
        dietaryPreferences: {
            vegetarian: recipe.vegetarian,
            vegan: recipe.vegan,
            glutenFree: recipe.glutenFree,
            dairyFree: recipe.dairyFree,
            healthy: recipe.veryHealthy,
            cheap: recipe.cheap,
            sustainable: recipe.sustainable,
            },
        recipeIngredients: recipe.extendedIngredients.map(ingredient => {
            return({
                ingredient: ingredient.name,
                amount: String(ingredient.amount) + ingredient.unit,
                howToPrepare: ingredient.originalString
            });
        }),
        title: recipe.title,
        likes: recipe.aggregateLikes,
        timeToCook: String(recipe.readyInMinutes),
        servings: recipe.servings,
        img: recipe.image,
        overview: recipe.summary,
        instructions: recipe.instructions,
        tags: recipe.dishTypes,
        datePosted: dateString,
        postedBy: faker.name.findName()
    });
})

mongoose.connect('mongodb://localhost:27017/pocketChefDB', {useNewUrlParser: true}, function () {
    console.log("db connected successful!")
});

const section_names = ['Popular Recipes', 'Ready within 20 Minutes', '5 Ingredients or Less', 'Gluten-Free', 'Vegetarian', 'Easy Dinner Recipes', 'Easy Chicken Recipes'];

const recipeSchema = new mongoose.Schema({
    dietaryPreferences: Object, //Object of keys with boolean values Example: {vegetarian: false, vegan: true, etc.}
    recipeIngredients: Array, //Array of objects with name of ingredient and amount Example: [{ingredient: 'tomato', amount: 2}, etc.]
    title: String, //Name of recipe
    likes: Number,
    reviews: Array, //Array of objects with headline, review, and reviewer name Example: [{headline: 'Best pancakes ever', review: 'Would definitely make again', userName: 'Frank Jones'}]
    img: String, //Url string of recipe image
    datePosted: String, //Date string of when recipe was posted
    servings: Number, //Number of servings detailed in recipe    
    overview: String, //Author's note
    instructions: String, //String of instructions
    tags: Array, //Array of tag strings Example ['breakfast', 'main dish', 'fast to make', etc.] 
    timeToCook: String,
    postedBy: String
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        minlength: 3
    },
    password: {
        type: String,
        require: true
    },
    fullname: {
        type: String,
        require: true
    }, 
    blogname: {
        type: String, 
        require: false,
        articles: {
            type: Array,
            require: true
        }
    }, 
    savedRecipes: {
        type: Array,
        require: true
    },
    savedArticles: {
        type: Array,
        require: true
    }
});

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    comments: {
        type: Array, //Array of objects in the format of recipe reviews: [{headline: 'Best pancakes ever', review: 'Would definitely make again', userName: 'Frank Jones'}]
        require: true
    },
    datePosted: {
        type: String,
        require: true
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

fs.writeFile('recipes.json', JSON.stringify(recipesArr), err => {
    if (err) {
      console.error(err)
      return;
    }
    //file written successfully
  })

Recipe.insertMany(recipesArr, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("All data saved");
        mongoose.connection.close();
    }
});