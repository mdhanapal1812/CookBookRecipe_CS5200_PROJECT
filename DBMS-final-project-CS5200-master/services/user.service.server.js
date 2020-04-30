module.exports = function (app) {

    app.get('/api/user', findAllUsers);
    app.get('/api/expert', findAllExperts);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/userType/:userId', findUserTypeById);
    app.get('/api/expertDomain/:userId', findUserExpertDomainById);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.put('/api/update/profile', updateUser);
    app.put('/api/update/user', updateUserById);
    app.put('/api/update/userType', updateUserType);
    app.put('/api/update/expertDomain', updateUserExpertDomain);
    app.delete('/api/delete/user', deleteUser);
    app.put('/api/following', setFollowing);
    app.get('/api/following', getFollowing);
    app.get('/api/followers', getFollowers);

    const userModel = require('../daos/userDao/user.dao.server');

    // findAllUsers
    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    // findAllExperts
    function findAllExperts(req, res) {
        userModel.findAllExperts()
            .then(function (experts) {
                res.send(experts);
            })
    }

    // findUserByUsername
    function findUserByUsername(req, res) {
        let user = req.body;
        let username = user.username;
        userModel.findUserByUsername(username)
            .then(function (users) {
                res.send(users);
            })
    }

    // findUserById
    function findUserById(req, res) {
        let id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    // findUserTypeById
    function findUserTypeById(req, res) {
        let id = req.params['userId'];
        userModel.findUserTypeById(id)
            .then(function (userType) {
                res.json(userType);
            })
    }

    // findUserExpertDomainById
    function findUserExpertDomainById(req, res) {
        let id = req.params['userId'];
        userModel.findUserTypeById(id)
            .then(function (expertDomain) {
                res.json(expertDomain);
            })
    }

    function login(req, res) {
        let credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(function (user) {
                req.session.currentUser = user;
                res.json(user);
            })
    }

    function profile(req, res) {
        let currentUser = req.session.currentUser;
        if (typeof (currentUser) != "undefined") {
            let userId = currentUser._id;
            userModel.findUserById(userId)
                .then(function (user) {
                    res.json(user);
                });
        } else {
            let user = {
                username: ''
            };
            return res.json(user);
        }
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    // updateUser
    function updateUser(req, res) {
        let user = req.body;
        let currentUser = req.session.currentUser;
        let userId = currentUser._id;
        userModel.updateUser(userId, user)
            .then(function (user) {
                res.json(user);
            })
    }

    // updateUserById
    function updateUserById(req, res) {
        let user = req.body;
        let currentUser = req.session.currentUser;
        let userId = user._id;
        userModel.updateUser(userId, user)
            .then(function (user) {
                res.json(user);
            })
    }

    // updateUserType
    function updateUserType(req, res) {
        let user = req.body;
        // let currentUser = req.session.currentUser;
        let userId = user._id;
        let userType = user.userType;
        userModel.updateUserType(userId, userType)
            .then(function (user) {
                res.json(user);
            })
    }

    // updateUserExpertDomain
    function updateUserExpertDomain(req, res) {
        let user = req.body;
        let userId = user._id;
        let expertDomain = user.expertDomain;
        userModel.updateUserExpertDomain(userId, expertDomain)
            .then(function (user) {
                res.json(user);
            })
    }

    // deleteUser
    function deleteUser(req, res) {
        let user = req.body;
        let id = user.id;
        userModel.deleteUserById(id)
            .then(function (response) {
                res.json(response)
            })
    }

    function setFollowing(req, res) {
        let obj = req.body;
        let followId = obj.id;
        let userName = obj.user;
        let currentUser = req.session.currentUser;
        let userId = currentUser._id;
        let currentUserName = currentUser.username;
        userModel.setFollowing(userId, followId, userName)
            .then(function () {
                return userModel.setFollowers(followId, userId, currentUserName)
            }).then(function (response) {
            res.json(response);
        })
    }

    function getFollowing(req, res) {
        //This is for following attribute of user
        let currentUser = req.session.currentUser;
        let userId = currentUser._id;
        userModel.getFollowing(userId)
            .then(function (followers) {
                res.json(followers);
            })
    }

    function getFollowers(req, res) {
        //This is for following attribute of user
        let currentUser = req.session.currentUser;
        let userId = currentUser._id;
        userModel.getFollowers(userId)
            .then(function (user) {
                res.json(user);
            })
    }

    // createUser
    function createUser(req, res) {
        const user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            });
    }
};
