
const recipeModel = require('../../models/recipe/recipe.model.server');

function createRecipe(recipe) {
    return recipeModel.create(recipe);
}

function deleteRecipeById(recipeId) {
    return recipeModel.remove({
        _id: recipeId
    });
}

function findAllRecipes() {
    return recipeModel.find();
}


const api = {
    createRecipe,
    deleteRecipeById,
    findAllRecipes
};

module.exports = api;