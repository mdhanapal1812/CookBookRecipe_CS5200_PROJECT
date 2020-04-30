const userModel = require('../../models/user/user.model.server');

//create user
createUser = (user) => {
    return userModel.create(user);
};

//find all users
findAllUsers = () => {
    return userModel.find();
};

//find user by Id
findUserById = (userId) => {
    return userModel.findById(userId, {password: 0});
};

//find user by credentials
findUserByCredentials = (credentials) => {
    return userModel.findOne(credentials, {username: 1, userType: 1});
}

// find user by username
findUserByUsername = (username) => {
    return userModel.findOne({username: username}, {password: 0});
};

//delete user by Id
deleteUserById = (userId) => {
    return userModel.remove({_id: userId});
};

//update user
updateUser = (userId, user) => {
    return userModel.updateOne({
                                   _id: userId,
                               }, {
                                   $set: {
                                       username: user.username,
                                       dateOfBirth: user.dateOfBirth,
                                       firstName: user.firstName,
                                       lastName: user.lastName,
                                       email: user.email,
                                       phone: user.phone,
                                       address: user.address
                                   }
                               });
};

//set following
setFollowing = (userId, followId, userName) => {
    return userModel.updateOne({
                                   _id: userId
                               }, {
                                   $push: {
                                       following: {id: followId, user: userName}
                                   }
                               });
};

//get following
getFollowing = (userId) => {
    return userModel.findOne({
                                 _id: userId,
                             }, {following: 1})
};

//set followers
setFollowers = (userId, followId, userName) => {
    return userModel.updateOne({
                                   _id: userId
                               }, {
                                   $push: {
                                       followers: {id: followId, user: userName}
                                   }
                               });

};

//get followers
getFollowers = (userId) => {
    return userModel.findOne({
                                 _id: userId,
                             }, {followers: 1})
};

//update user type
updateUserType = (userId, usertype) => {
    return userModel.findOneAndUpdate({
                                          _id: userId,
                                      }, {
                                          $set: {userType: usertype}
                                      },
                                      {new: true})
};

//find user type by userId
findUserTypeById = (userId) => {
    return userModel.findOne({
                                 _id: userId,
                             },
                             {userType: 1})
};

//update expert domain using id
updateUserExpertDomain = (userId, domain) => {
    return userModel.findOneAndUpdate({
                                          _id: userId,
                                      }, {
                                          $push: {
                                              expertDomain: domain
                                          }
                                      },
                                      {new: true}
    )
};

//find expert domain by id
findUserExpertDomainById = (userId) => {
    return userModel.findOne({
                                 _id: userId,
                             }, {expertDomain: 1})
};

//find all experts
findAllExperts = () => {
    return userModel.find({userType: "expert"})
};

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    updateUser,
    findUserByCredentials,
    deleteUserById,
    setFollowing,
    getFollowing,
    setFollowers,
    getFollowers,
    updateUserType,
    findUserTypeById,
    updateUserExpertDomain,
    findUserExpertDomainById,
    findAllExperts
};

