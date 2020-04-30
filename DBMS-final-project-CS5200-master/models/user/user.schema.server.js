const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
                                     username: String,
                                     password: String,
                                     dateOfBirth: Date,
                                    isCook: Boolean,
                                     firstName: String,
                                     lastName: String,
                                     email: String,
                                     phone: Number,
                                     address: [{
                                         street: String,
                                         city: String,
                                         state: String,
                                         zip: Number,
                                     }],
                                     followers: [],
                                     following: [],
                                     userType:{type: String, enum:['user','expert','admin'], default: 'user'},
                                     expertDomain:[String]
                                 }, {collection:'user'});

module.exports = userSchema;


