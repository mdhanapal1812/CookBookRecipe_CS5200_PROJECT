const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
                                       title: String,
                                       content: String,
                                       user: {
                                           type: mongoose.Schema.Types.ObjectId,
                                           ref: 'UserModel'
                                       },
                                       updatedOn: Date,
                                       createdOn: Date,
                                       src: String,
                                        postType:{type: String, enums:["image","text"]},
                                       comments: [{
                                           commentAnswer: String,
                                           updatedOn: Date,
                                           createdOn: Date,
                                       }]
                                   }, {collection: 'post'});

module.exports = postSchema;
