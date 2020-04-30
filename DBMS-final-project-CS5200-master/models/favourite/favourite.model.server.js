const mongoose = require('mongoose');
const favouriteSchema = require('./favourtie.schema.server');

const favouriteModel = mongoose.model('FavouriteModel', favouriteSchema);

module.exports = favouriteModel;