const Item = require('../schemas/item');
const List = require('../schemas/list');

const repository = {
    findListByParentId: async ( parentId ) => {
        return await List.find({_id: parentId});
    },

    findListAncesById: async (id) => {
        return await List.find({ ancestors: id })
    },

    deleteManyLists: async (id) => {
        return await List.deleteMany({ ancestors: id })
    }
};

module.exports = repository;