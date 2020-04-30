module.exports = function (app) {

    app.get('/api/post', findAllPosts);
    app.get('/api/post/user', findAllPostsByUser);
    app.get('/api/post/user/:userId', findAllPostsByUserId);
    app.get('/api/post/id/:postId', findPostById);
    app.get('/api/comment/:postId', findAllCommentsByPostId);
    app.post('/api/post', createPost);
    app.put('/api/update/post', updatePost);
    app.put('/api/update/post/comment', addCommentForAPost);
    app.put('/api/update/post/updateComment', updateCommentById);
    app.delete('/api/post', deletePostById);
    app.delete('/api/post/comment', deleteCommentById);

    const postModel = require('../daos/postDao/post.dao.server');

    // findAllPosts
    function findAllPosts(req, res) {
        postModel.findAllPosts()
            .then(function (posts) {
                res.send(posts);
            })
    }

    // findAllPostsByUserId
    function findAllPostsByUser(req, res) {
        const currentUser = req.session.currentUser;
        const userId = currentUser._id;
        postModel.findAllPostsByUserId(userId)
            .then(function (posts) {
                res.send(posts);
            })
    }

    function findAllPostsByUserId(req, res) {
        const id = req.params['userId'];
        postModel.findAllPostsByUserId(id)
            .then(function (posts) {
                res.send(posts);
            })
    }

    // findPostById
    function findPostById(req, res) {
        const id = req.params['postId'];
        postModel.findPostById(id)
            .then(function (post) {
                res.json(post);
            })
    }

    // findAllCommentsByPostId
    function findAllCommentsByPostId(req, res) {
        let id = req.params['postId'];
        postModel.findAllCommentsByPostId(id)
            .then(function (comments) {
                res.json(comments);
            })
    }

    // createPost
    function createPost(req, res) {
        const post = req.body;
        const currentUser = req.session.currentUser;
        post.user = currentUser._id;
        postModel.createPost(post)
            .then(function (post) {
                res.send(post);
            });
    }

    // deletePostById
    function deletePostById(req, res) {
        const post = req.body;
        const id = post.id;
        postModel.deletePostById(id)
            .then(function (response) {
                res.json(response)
            })
    }

    // updatePost
    function updatePost(req, res) {
        let post = req.body;
        let postId = post.id;
        postModel.updatePost(postId, post)
            .then(function (post) {
                res.json(post);
            })
    }

    // updateCommentById
    function addCommentForAPost(req, res) {
        const postId = req.body.id;
        const comment = req.body.comment;
        postModel.addCommentForAPost(postId, comment)
            .then(function (comment) {
                res.json(comment);
            })
    }

    function deleteCommentById(req, res) {
        const postId = req.body.id;
        const commentId = req.body.commentId;
        postModel.deleteCommentById(postId, commentId)
            .then(function (comment) {
                res.json(comment);
            })
    }



    // updateCommentById
    function updateCommentById(req, res) {
        const postId = req.body.postId;
        const comment = req.body.comments;
        const commentId = req.body.comments._id;
        postModel.updateCommentById(postId, commentId, comment)
            .then(function (comment) {
                res.json(comment);
            })
    }

};