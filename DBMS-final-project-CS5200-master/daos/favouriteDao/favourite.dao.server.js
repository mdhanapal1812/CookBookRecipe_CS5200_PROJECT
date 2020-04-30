const favouriteModel = require('../../models/favourite/favourite.model.server');


function linkLikedRecipeToUser(recipe) {
    return favouriteModel.create(recipe);
}

function findRecipeForUser(userId ) {
    return favouriteModel
        .find({user: userId})
        .populate('recipe');
}
function deleteLikedRecipeToUser(id) {
    return favouriteModel.remove({
        recipe: id
    });
}


module.exports = {
    linkLikedRecipeToUser,
    findRecipeForUser,
    deleteLikedRecipeToUser
};