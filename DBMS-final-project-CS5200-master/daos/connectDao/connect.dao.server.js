const connectModel = require('../../models/connect/connect.model.server');

// joins the tag to a post
connectPostToTag = (connectPosts) => {
    return connectModel.create(connectPosts);
};

// finds all tags that the post has
findTagsInPost = (postId) => {
    return connectModel.find({
                                 post: postId
                             }).populate('tags').exec()
};

// finds all posts with the tag (input)
findPostsInTag = (tagId) => {
    return connectModel.find({
                                 tags: tagId
                             }).populate('post').exec()
};


// finds all posts with the tag name
findPostsByTagName = (tagName) => {
    return connectModel.find({
                                 tagName: tagName
                             }).populate('post').exec()
};
module.exports = {
    connectPostToTag,
    findTagsInPost,
    findPostsInTag,
    findPostsByTagName
};