
require("dotenv").config();
var unirest = require("unirest");

var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/images/analyze");

req.query({
	"imageUrl": "https://spoonacular.com/recipeImages/635350-240x150.jpg"
});

req.headers({
	"x-rapidapi-key": process.env.RAPID_SPOONACULAR_API_KEY,
	"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});
