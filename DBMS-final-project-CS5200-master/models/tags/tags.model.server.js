const mongoose = require('mongoose');
const tagsSchema = require('./tags.schema.server');
module.exports = mongoose.model('TagsModel', tagsSchema);