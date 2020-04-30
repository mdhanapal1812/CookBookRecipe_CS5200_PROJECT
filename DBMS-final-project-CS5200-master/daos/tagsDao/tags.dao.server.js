const tagsModel = require('../../models/tags/tags.model.server');

//create a tag
createTag = (tag) => {
    return tagsModel.create(tag)
};

//delete tag by id
deleteTagById = (id) => {
    return tagsModel.deleteOne({_id: id})
};

//find tag by id
findTagById = (id) => {
    return tagsModel.findById(id)
};

//update tag by id
updateTagById = (id, tagName) => {
    return tagsModel.findOneAndUpdate({_id: id},
                                      {
                                          $set: {
                                              tagName: tagName
                                          }
                                      })
};

//find all tags
findAllTags = () => {
    return tagsModel.find()
};

module.exports = {
    createTag,
    deleteTagById,
    findTagById,
    updateTagById,
    findAllTags
};