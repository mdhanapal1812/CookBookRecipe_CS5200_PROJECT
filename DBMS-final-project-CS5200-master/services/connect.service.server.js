module.exports = function (app) {

    app.post('/api/connect', connectPostToTag);
    app.get('/api/tag/post/:postId', findTagsInPost);
    app.get('/api/post/tag/:tagId', findPostsInTag);
    app.get('/api/post/tag/name/:tagName', findPostsByTagName);

    const connectModel = require('../daos/connectDao/connect.dao.server');

    // creates a conn between post and tag
    function connectPostToTag(req, res) {
        let connect = req.body;
        connectModel.connectPostToTag(connect)
            .then(function (connect) {
                res.send(connect);
            });
    }

    // finds all tags that the post has
    function findTagsInPost(req, res) {
        let postId = req.params['postId'];
        connectModel.findTagsInPost(postId)
            .then(function (tags) {
                res.json(tags);
            })
    }

    // finds all posts with the tag (input)
    function findPostsInTag(req, res) {
        let tagId = req.params['tagId'];
        connectModel.findPostsInTag(tagId)
            .then(function (posts) {
                res.json(posts);
            })
    }

    // finds all posts with the tag name
    function findPostsByTagName(req, res) {
        let tagName = req.params['tagName'];
        connectModel.findPostsByTagName(tagName)
            .then(function (posts) {
                res.json(posts);
            })
    }
};
