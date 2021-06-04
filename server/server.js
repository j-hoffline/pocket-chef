require("dotenv").config();
const fs = require('fs');
var unirest = require("unirest");

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

//Add sessions
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: '12345', //CHANGE THIS <---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/pocketChefDB",
    {useNewUrlParser: true}, function () {
        console.log("database connection successful");
    }); //development url: mongodb+srv://jonathan-admin:clarkcs2021@cluster0.forfr.mongodb.net

const recipeSchema = new mongoose.Schema({
    dietaryPreferences: Object, //Object of keys with boolean values Example: {vegetarian: false, vegan: true, etc.}
    recipeIngredients: Array, //Array of objects with name of ingredient and amount Example: [{ingredient: 'tomato', amount: 2}, etc.]
    title: String, //Name of recipe
    rating: Number, //Average rating of recipe
    numOfRatings: Number, //Number of ratings
    reviews: Array, //Array of objects with headline, review, and reviewer name Example: [{headline: 'Best pancakes ever', review: 'Would definitely make again', userName: 'Frank Jones'}]
    img: String, //Url string of recipe image
    datePosted: String, //Date string of when recipe was posted
    servingSize: Number, //Number of servings detailed in recipe    
    overview: String, //Author's note
    instructions: Array, //Array of strings with instructions
    tags: Object, //Object of keys with boolean values for recipe tags Example {breakfast: false, lunch: false, fastToMake: true, etc.} 
});

const Recipe = mongoose.model('Recipe', recipeSchema);

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

const Article = mongoose.model('Article', articleSchema);

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

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

//Configure passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(3001, function () {
    console.log("server started at 3001");
});

app.get('/node_get_current_user', function (req, res) {
    if (req.isAuthenticated()) {
        res.send({
            message: "success",
            data: req.user
        });
    } else {
        res.send({
            message: "no user",
            data: {}
        });
    }
});

// Register a new user, if success, return the current user
app.post('/node_register', (req, res) => {
    const newUser = {
        username: req.body.username,
        fullname: req.body.fullname,
    };
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            res.send({
                message: "error",
                data: err
            });
        } else {
            const authenticate = passport.authenticate("local");
            authenticate(req, res, () => {
                res.send({
                    message: "success",
                    user: req.user
                });
            });
        }
    });
});

// Login the user, if success, return the current user
app.post('/node_login', (req, res) => {
    const user = new User({
        username: req.body.username,
        passport: req.body.password
    })
    req.login(user, (err) => {
        if (err) {
            res.send({
                message: "error",
                data: err
            });
        } else {
            const authenticate = passport.authenticate(
                "local",
                {},
                (error, userExist, info) => {
                    if (userExist) {
                        res.send({
                            message: "success",
                            user: req.user
                        });
                    } else {
                        res.send({
                            message: "error",
                            data: info
                        });
                    }
                });
            authenticate(req, res);
        }
    });
});

// logout the user
app.get('/node_logout', (req, res) => {
    req.logout();
    res.send({
        message: "success"
    });
});

app.get('/node_get_all_recipes', (req, res) => {
    Recipe.find((err, data) => {
        if (err) {
            res.send({
                message: "internal database error",
                data: []
            });
        } else {
            res.send({
                message: "success",
                data: data
            });
        }
    });
});

app.post('/node_add_recipe', (req, res) => {
    const recipe = req.body;
    if (recipe._id) {
        //Update existing recipe
        Recipe.updateOne({_id: recipe._id},
            {$set: recipe},
            {runValidators: true},
            (err, info) => {
                if (err) {
                    res.send({
                        "message": err,
                        "recipe": recipe
                    });
                } else {
                    res.send({
                        message: "success"
                    });
                }
            });
    } else {
        //create new recipe
        const newRecipe = new Recipe(recipe);

        newRecipe.save((err, new_recipe) => {
            if (err) {
                res.send({
                    message: err,
                    recipe: recipe
                });
            } else {
                res.send({
                    message: "success"
                });
                console.log("saved successfully");
            }
        })
    }
});

app.get('/node_get_recipe_by_id', (req, res) => {
    Recipe.find({_id: req.query.rec_id}, (err, data) => {
        if (err || data.length === 0) {
            res.send({
                message: "internal database error",
                data: {}
            });
        } else {

            res.send({
                message: "success",
                data: data[0]
            });
        }
    });
});


// var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random");

// req.query({
// 	"number": "100"
// });

// req.headers({
// 	"x-rapidapi-key": process.env.RAPID_SPOONACULAR_API_KEY,
// 	"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
// 	"useQueryString": true
// });


// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	fs.writeFile('recipes.txt', JSON.stringify(res.body), err => {
// 		if (err) {
// 		  console.error(err)
// 		  return;
// 		}
// 		//file written successfully
// 	  })
// });


app.get('/node_get_all_recipes', function (req, res) {
    Recipe.find(function (err, data) {
        if (err) {
            res.send({
                'massage': 'internal database error',
                'data': []
            })
        } else {
            res.send({
                'massage': 'success',
                'data': data
            })
        }
    })
})

app.get('/get_recipes_by_filters',
    (req, res) => {
        const search_key = req.query.search_key
        console.log(search_key)
        Recipe.find({
               $or: [
                    {overview: {$regex: search_key}},
                    {title: {$regex: search_key}}
                ]
            }, (err, data) => {
                if (err) {
                    res.send({
                        "message": "db error",
                        "data": []
                    })
                } else {
                    res.send({
                        "message": "success",
                        "data": data
                    })
                }
            }
        )

    }
)