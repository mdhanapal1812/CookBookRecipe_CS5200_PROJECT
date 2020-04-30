const mongoose = require('mongoose');
const favouriteSchema = mongoose.Schema({
    recipe: {
        type: mongoose.Schema.ObjectId,
        ref: 'RecipeModel'},
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserModel'},
},{collection: 'FavouriteRecipe'});

module.exports = favouriteSchema;