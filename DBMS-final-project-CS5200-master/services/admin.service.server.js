module.exports = function (app) {

    app.get('/api/admin', findAllAdmins);
    // app.get('/api/admin/:userId', findUserById);
    app.post('/api/admin', createUserFromAdmin);
    app.post('/api/admin', createAdmin);
    app.post('/api/admin', createPostFromAdmin);
    // app.get('/api/profile', profile);
    // app.post('/api/logout', logout);
    // app.post('/api/login', login);
    app.put('/api/update/profile', updateUserFromAdmin);
    app.put('/api/update/profile', updatePostFromAdmin);
    app.delete('/api/delete/admin', deleteOtherAdmin);
    app.delete('/api/delete/admin', deletePostByIdFromAdmin);
    app.delete('/api/delete/admin', deleteUserFromAdmin);

    const adminDao = require('../daos/adminDao/admin.dao.server');
    const userDao = require('../daos/userDao/user.dao.server');
    const postDao = require('../../models/user/post.model.server');

    // find all admins
    function findAllAdmins(req, res) {
        adminDao.findAllAdmins()
            .then(function (users) {
                res.send(users);
            })
    }

    // create admin
    function createAdmin(req, res) {
        const admin = req.body;
        adminDao.createAdmin(admin)
            .then(function (admin) {
                req.session['currentUser'] = admin;
                res.send(admin);
            });
    }

    //createUserFromAdmin
    /*
        {
            currentAdmin: {
            admin from current Session
            },
            newUser: {
            user from current session
            }
        }
     */
    function createUserFromAdmin(req, res) {
        const currentAdmin = req.body.currentAdmin;
        const newUser = req.body.newUser;

        if (adminDao.checkAdmin(currentAdmin)) {
            adminDao.createUserFromAdmin(newUser)
                .then(function (newUser) {
                    res.send(newUser);
                });
        } else {
            const err = {message: "Function Available only for Admin!"}
            res.send(err)
        }
    }

    // deleteOtherUser - Deleting other admin from Current Admin User
    function deleteOtherAdmin(req, res) {
        let currentAdmin = req.body.currentAdmin;
        let adminToBeDeleted = req.body.otherAdmin;
        let id = adminToBeDeleted.id;
        if (adminDao.checkAdmin(currentAdmin)) {
            adminDao.deleteUser(id)
                .then(function (response) {
                    res.json(response)
                })
        } else {
            const err = {message: "Function Available only for Admin!"}
            res.send(err)
        }
    }

    // deleteUserFromAdmin
    function deleteUserFromAdmin(req, res) {
        let currentAdmin = req.body.currentAdmin;
        let user = req.body.user;
        if (adminDao.checkAdmin(currentAdmin)) {
            adminDao.deleteUserFromAdmin(user._id)
                .then(function (response) {
                    res.json(response)
                })
        } else {
            const err = {message: "Function Available only for Admin!"}
            res.send(err)
        }
    }

    // updateUserFromAdmin
    function updateUserFromAdmin(req, res) {
        let currentAdmin = req.body.currentAdmin;
        let user = req.body.user;
        let userId = user._id;
        if (adminDao.checkAdmin(currentAdmin)) {
            adminDao.updateUserFromAdmin(userId)
                .then(function (response) {
                    res.json(response)
                })
        } else {
            const err = {message: "Function Available only for Admin!"}
            res.send(err)
        }
    }

    // createPostFromAdmin
    function createPostFromAdmin(req, res) {
        let post = req.body;
        adminDao.createPostFromAdmin(post)
            .then(function (post) {
                res.send(post);
            });
    }

    // updatePostFromAdmin updating other people's post/own post
    function updatePostFromAdmin(req, res) {
        let currentAdmin = req.body.currentAdmin;
        let post = req.body;
        let postId = post._id;
        if (adminDao.checkAdmin(currentAdmin)) {
            adminDao.updatePostFromAdmin(postId, post)
                .then(function (post) {
                    res.json(post)
                })
        } else {
            const err = {message: "Function Available only for Admin!"}
            res.send(err)
        }
    }

    // deletePostByIdFromAdmin
    function deletePostByIdFromAdmin(req, res) {
        let currentAdmin = req.body.currentAdmin;
        let post = req.body;
        let postId = post.id;
        if (adminDao.checkAdmin(currentAdmin)) {
            adminDao.deletePostByIdFromAdmin(postId)
                .then(function (post) {
                    res.json(post)
                })
        } else {
            const err = {message: "Function Available only for Admin!"}
            res.send(err)
        }

    }

};