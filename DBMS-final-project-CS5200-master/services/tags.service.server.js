module.exports = function (app) {

    app.get('/api/tag', findAllTags);
    app.get('/api/tag/:tagId', findTagById);
    app.post('/api/tag', createTag);
    app.put('/api/update/tag', updateTagById);
    app.delete('/api/delete/tag', deleteTagById);

    const tagModel = require('../daos/tagsDao/tags.dao.server');
    const connectModel = require('../daos/connectDao/connect.dao.server')

    // find all tags
    function findAllTags(req, res) {
        tagModel.findAllTags()
            .then(function (tags) {
                res.send(tags);
            })
    }

    // find tag by id
    function findTagById(req, res) {
        let id = req.params['tagId'];
        tagModel.findTagById(id)
            .then(function (tag) {
                res.json(tag);
            })
    }

    // update tag by id
    function updateTagById(req, res) {
        let tag = req.body;
        let tagId = tag._id;
        tagModel.updateTagById(tagId, tag)
            .then(function (tag) {
                res.json(tag);
            })
    }

    // delete tag by id
    function deleteTagById(req, res) {
        let tag = req.body;
        let id = tag._id;
        tagModel.deleteTagById(id)
            .then(function (response) {
                res.json(response)
            })
    }

    // create tag
    function createTag(req, res) {
        const tag = req.body;
        const postId = tag.id;
        console.log("post Id", postId);
        tagModel.createTag(tag)
            .then(function (tag) {
                const connect = {
                    tags: tag._id,
                    post: postId
                }
                connectModel.connectPostToTag(connect).then(response => {
                    res.json(tag);
                })
            });
    }
};
