const Item = require('../schemas/item');
const List = require('../schemas/list');

class repository {

    // for Lists
    async findListByParentId (parentId) {
        return await List.find({_id: parentId});
    }

    async findListAncesById (id) {
        return await List.find({ ancestors: id })
    }

    async deleteManyLists (id) {
        return await List.deleteMany({ ancestors: id })
    }

    // for Items
    async findItemByParentId (parentId) {
        return await Item.find({_id: parentId})
    }

    async findItemAncesById (id) {
        return await Item.find({ ancestors: id })
    }

    async deleteManyItems (id) {
        return await Item.deleteMany({ ancestors: id });
    }
}

module.exports = repository;