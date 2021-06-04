var faker = require('faker');

const mongoose = require('mongoose');
const fs = require('fs');
//JSON file fetched from Spoonacular API
const rawdata = fs.readFileSync(__dirname + "/recipes100.json");
jsonObject = JSON.parse(rawdata);

const date = new Date();
const dateString = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

//Make array of recipes from file
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
});

//Connect to database
mongoose.connect('mongodb://localhost:27017/pocketChefDB', {useNewUrlParser: true}, function () {
    console.log("db connected successful!")
});

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

//User Schema for mongodb
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


//Article schema for mongoDB
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: false
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
const Article = mongoose.model('Article', articleSchema);

fs.writeFile('recipes.json', JSON.stringify(recipesArr), err => {
    if (err) {
      console.error(err)
      return;
    }
    //file written successfully
  })

  //Insert recipes into database
Recipe.insertMany(recipesArr, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("All data saved");
    }
});

//Sample article data for database
let articleArr = [{
    title: 'Mealplanning - How to get started',
    image: 'https://www.bellybelly.com.au/wp-content/uploads/2020/11/meal-planning.jpg',
    author: 'Gordon Ramsay',
    content: "To the uninitiated, meal planning can feel like an elusive practice or an overwhelming task, but that’s usually because we think about meal planning from the end point — when all the recipes have been selected, when all the groceries have been shopped for, and a week of dinners were successfully made. Put all the information in front of a newbie and their eyes grow wide with one resounding question: But how do I do it?",
    datePosted: "6/2/2021",
    comments: [] 
}, {
title: "Cooking for Beginners",
image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_41/3044956/191009-cooking-vegetables-al-1422-3044956.jpg",
author: "Bobby Flay",
content: "How to start cooking at home when you are a beginner cook who just never got around to learning the basics of cooking? And today you want to start to cook your own food? If this is you, you’re not alone. More and more people are finding that cooking at home is the best way to treat themselves while maintaining a balanced diet. Whether it’s to better control what we put on our plates, or achieve a tasty meal to share with family, friends and colleagues, or whether trying to save money while choosing good ingredients – for many people, cooking is an act with lots of emotional and social implications. We encourage you to have a look on the updated page for how to start cooking for cooking beginners. How to start cooking at home We agree that when you are a beginner and have little time for yourself and your family, you think that cooking by yourself is not a priority, and it is difficult to find the courage and will to learn how. That’s why, on this page, we want to share some cooking basics for beginners on how to get started in the kitchen. We’ve gathered a collection of articles that cover the basics of cooking, tips for cooking and home cooking recipes, all broken down into several steps to make it easier for you. We hope you find our cooking tips and recipes useful for getting started in the kitchen. Have a good read! The basics to get started in the kitchen Here’s an overview to get a good start when cooking at home. The beginner’s guide to get started in the kitchen! — Everyone needs to start from somewhere, here’s how to address the beginner’s block. The 10 essential utensils to get started in the kitchen — What are the most useful utensil when you begin cooking. Tips for successful recipes — This explains the best ways to ensure good results when following a recipe. A little kitchen philosophy: 10 little homecooking tips and maxims Basic Cooking Methods All about aromatic Herbs and spices  — Discover the power of herbs and spice to enhance food. Basic skills and techniques Here’s few techniques and gestures to get familiar with your utensils and also increase the taste of anything you decide to cook.",
comments: [],
datePosted: "6/2/2021"
},
{
title: "Reigniting your Family's Love of Cooking",
image: "https://askthescientists.com/wp-content/uploads/2018/04/AdobeStock_39175932-e1523375646286.jpeg",
author: "Rachel Ray",
content: "In today’s busy world, ‘cooking dinner’ often means throwing a pizza into the oven, or popping a ready-made lasagna in the microwave. Making time to prepare a full meal might seem impossible between work, traffic, school, and after-school activities. It’s important to make time for family cooking together, because there are plenty of benefits for your family! Your family is a team, and reinforcing that bond will only make your family a stronger unit. Form and reinforce bonds, and foster family togetherness by teaching cooking at home. Connect with your kids by creating something that others can enjoy – especially during the holidays! Teach vocabulary and concepts that might not usually be addressed at schools, like exotic ingredients or metric measurements Teach problem solving – including converting recipes, substitutes if you’re missing ingredients, and flexibility. Depending on your child’s age, they might even be able to apply math or science lessons learned at school! Teach planning and organization – how to think ahead and be prepared by setting out a weekly menu and grocery list. Introduce the concept of social responsibility, such as animal welfare, local produce and economy, and sustainably-sourced ingredients. Foster teamwork in your kitchen. Very young kids won’t be able (or allowed!) to cut and cook ingredients, but they can help select groceries, set the table, measure out ingredients, tear up lettuce for salads, and be taste testers too! By involving your kids in an important part of the day, you help build confidence and self-worth. Develop social skills! It’s much easier for kids to take their food and sit in front of the TV or play games on their tablet. It takes a bit more work for kids to converse with the family, but it’s worthwhile! Teach cleanliness and appreciation. Kids will learn that the meal that they sit down to doesn’t appear out of mid-air. Their food comes from somewhere, and involving them from shopping to the finished product will help demonstrate that hard work goes into the meal they enjoy.",
comments: [],
datePosted: "6/2/2021"
}
];

//Insert Articles into database
Article.insertMany(articleArr, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("All data saved");
        mongoose.connection.close();
    }
});