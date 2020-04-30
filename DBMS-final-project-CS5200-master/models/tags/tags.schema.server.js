const mongoose = require('mongoose');

const tagsSchema = mongoose.Schema({
                                       tagName: {
                                           type: String,
                                           enum: ['Lunch', 'Brunch', 'Dinner',
                                                  'Dessert', 'Chocolate', 'Pizza', 'Cakes'],
                                           default: 'Pizza'
                                       }
                                   }, {collection: 'tag'});
module.exports = tagsSchema;