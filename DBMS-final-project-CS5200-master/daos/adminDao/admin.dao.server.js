const userModel = require('../../models/user/user.model.server');
const postModel = require('../../models/post/post.model.server');

//Admin functions

//create admin
createAdmin = (admin) => {
    admin.userType = "admin";
    return userModel.create(admin);
};

//find all admins
findAllAdmins = () => {
    return userModel.find({userType: "admin"});
};

//delete admin
deleteUser = (admin) => {
    return userModel.delete(admin);
};

//create user
createUserFromAdmin = (user) => {
    return userModel.create(user);
};

//update user
updateUserFromAdmin = (userId, user) => {
    return userModel.updateOne({
                                   _id: userId,
                               }, {
                                   $set: {
                                       username: user.username,
                                       email: user.email,
                                       firstName: user.firstName,
                                       lastName: user.lastName,
                                       dateOfBirth: user.dateOfBirth,
                                       address: user.address,
                                       userType: user.userType
                                   }
                               });
};

//delete user
deleteUserFromAdmin = (userId) => {
    return userModel.remove({_id: userId});
};

//create post
createPostFromAdmin = (post) => {
    return postModel.create(post);
};

//update post
updatePostFromAdmin = (postId, post) => {
    return postModel.updateOne({
                                   _id: postId,
                               }, {
                                   $set: {
                                       title: post.title,
                                       content: post.content,
                                       posterId: post.posterId
                                   }
                               })
};

// delete post
deletePostByIdFromAdmin = (postId) => {
    return postModel.remove({_id: postId});
};

checkAdmin = (admin) => {
    const curUser = userModel.findOne({username: admin.username}, {password: 0})
    return curUser.userType === 'admin';
};

module.exports = {
    checkAdmin,
    deletePostByIdFromAdmin,
    updatePostFromAdmin,
    createPostFromAdmin,
    deleteUserFromAdmin,
    updateUserFromAdmin,
    createUserFromAdmin,
    deleteUser,
    createAdmin,
    findAllAdmins
};