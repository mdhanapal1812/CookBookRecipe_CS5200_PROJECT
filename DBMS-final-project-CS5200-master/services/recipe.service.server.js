
module.exports = function (app) {

    const recipeModel = require('../daos/recipeDao/recipe.dao.server');
    const favouriteModel = require('../daos/favouriteDao/favourite.dao.server');

    const axios = require('axios');

    const TWD = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search`;
    const DETAIL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/ID/information`;

    app.get('/api/search', searchRecipe);
    app.get('/api/recipe/:id', detailRecipe);
    app.post('/api/recipe', addRecipe);
    app.post('/api/user/recipe', getLikedRecipesByUserId);
    app.delete('/api/user/recipe', deleteLikedRecipeByRecipeId);



    function searchRecipe (req, res)  {

        const keyword = req.query['search'];

        const config ={
            params: {
                "number": "20",
                "query": `${keyword}`
            },
            headers : {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": `${process.env.TOKEN}`
        }};

        axios.get(TWD, config).then(response => {
            res.json(response.data);
        })
    }



    function detailRecipe (req, res)  {

        const id = req.params['id'];

        const DETAIL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`;

        const config ={
            headers : {
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": `${process.env.TOKEN}`
            }};

        axios.get(DETAIL, config).then(response => {
            res.json(response.data);
        })
    }


    function addRecipe(req, res) {
        const recipe = req.body;
        const currentUser = req.session.currentUser;
        const userId = currentUser._id;
        recipeModel.createRecipe(recipe).then((response) => {
            const likedRecipe ={
                recipe: response._id,
                user: userId
            };
            return favouriteModel.linkLikedRecipeToUser(likedRecipe)
        }).then((response) => (res.json(response)));
    }



    function getLikedRecipesByUserId(req, res) {
        const currentUser = req.session.currentUser;
        const userId = currentUser._id;
        favouriteModel.findRecipeForUser(userId)
            .then((recipes) => res.json(recipes))
    }

    function deleteLikedRecipeByRecipeId(req, res) {
        let recipe = req.body;
        let id = recipe.id;
        recipeModel.deleteRecipeById(id)
            .then(response =>  favouriteModel.deleteLikedRecipeToUser(id).then(resp =>  res.json(resp) ))

    }
};
