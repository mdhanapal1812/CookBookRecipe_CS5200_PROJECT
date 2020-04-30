const mongoose = require('mongoose');

const connectSchema = mongoose.Schema({
                                          tags: {
                                              type: mongoose.Schema.Types.ObjectId,
                                              ref: 'TagsModel'
                                          },
                                          post: {
                                              type: mongoose.Schema.Types.ObjectId,
                                              ref: 'PostModel'
                                          }
                                      }, {collection: 'connect'});

module.exports = connectSchema;