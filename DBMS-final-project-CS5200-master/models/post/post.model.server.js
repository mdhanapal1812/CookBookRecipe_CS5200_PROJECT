const mongoose = require('mongoose');
const postSchema = require('./post.schema.server');
const postModel = mongoose.model('PostModel', postSchema);

module.exports = postModel;