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

    async findAllList () {
        return await List.find({});
    }

    async createList (parentId) {
        return await List.create({parentId: parentId})
    }

    async findListByIdAndRemove (id) {
        return await List.findByIdAndRemove({_id: id})
    }


    // for Items
    async findItemByParentIdForId (parentId) {
        return await Item.find({_id: parentId})
    }

    async findItemAncesById (id) {
        return await Item.find({ ancestors: id })
    }

    async deleteManyItems (id) {
        return await Item.deleteMany({ ancestors: id });
    }

    async findAllItems () {
        return await Item.find({});
    }

    async findItemByParentId (parentId) {
        return await Item.find({ parentId: parentId });
    }

    async findItemById (id) {
        return await Item.find({_id: id});
    }

    async findItemByIdAndRemove (id) {
        return await Item.findByIdAndRemove({_id: id})
    }

    async findItemByIdAndUpdate (item) {
        return await Item.findByIdAndUpdate({ _id: item._id }, item)
    }
}

module.exports = repository;