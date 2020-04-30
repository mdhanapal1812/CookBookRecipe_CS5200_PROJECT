const postModel = require('../../models/post/post.model.server');

//create post
createPost = (post) => {
    return postModel.create(post);
};

//find all posts
findAllPosts = () => {
    return postModel.find().sort({updatedOn: -1});
};

findAllPostsByUserId = async (userId) => {
    return await postModel.find({user: userId});
}

//find post by id
findPostById = (postId) => {
    return postModel.findById(postId, {}).populate('user');
};

//delete post
deletePostById = (postId) => {
    return postModel.remove({_id: postId});
};

//update post
updatePost = (postId, post) => {
    return postModel.updateOne({
                                   _id: postId,
                               }, {
                                   $set: {
                                       title: post.title,
                                       content: post.content,
                                       posterId: post.posterId,
                                       updatedOn: post.updatedOn,
                                       createdOn: post.createdOn,
                                       postType: post.postType,
                                       src: post.src,
                                   }
                               });
};

// add comment for a post
addCommentForAPost = (postId, comment) => {
    return postModel.findOneAndUpdate({
                                          _id: postId
                                      }, {
                                          $push: {
                                              comments: comment
                                          }
                                      }, {
                                          new: true
                                      })
};

// find all comments by post id
findAllCommentsByPostId = (postId) => {
    return postModel.find({
                              _id: postId
                          }, {comments: 1, _id: 0})
};

// update comment by id
updateCommentById = (postId, commentId, comment) => {
    return postModel.findOneAndUpdate({_id: postId, 'comments._id': commentId}, {
        $set: {
            comments: comment
        }
    }, {
                                          new: true
                                      })
};

deleteCommentById = (postId, commentId) => {
    return postModel.update({_id: postId}, {$pull: { "comments" : { _id: commentId } }},{
        new: true
    });

}

module.exports = {
    createPost,
    findAllPosts,
    findPostById,
    deletePostById,
    findAllPostsByUserId,
    addCommentForAPost,
    findAllCommentsByPostId,
    updateCommentById,
    updatePost,
    deleteCommentById
};