const Item = require('../schemas/item');
const repository = require('./itemAndListRepository');

const itemModel = {
    add: async (label, parentId) => {

        let item = new Item();

        item.label = label;
        item.parentId = parentId;

        let position = await utils.findItemByParentId(parentId);
        item.pos = position.length;

        let parent = await repository.findListByParentId(parentId);
        item.ancestors = parent[0].ancestors.concat(parentId);

        return item.save();
    },

    delete: async (id) => {

        const listAncestors  = await repository.findListAncesById(id);
        if(listAncestors.length) await repository.deleteManyLists(id);

        const itemAncestors = await utils.findItemAncesById(id);
        if(itemAncestors.length) await utils.deleteManyItems(id);

        const deleteItem = await utils.findItemById(id);
        let parentId = deleteItem[0].parentId;
        let pos = deleteItem[0].pos;
        const items = await utils.findItemByParentId(parentId);
        items.filter(item => item.id !== id)
            .forEach(item => {
                if(item.pos > pos) item.pos -= 1;
                item.save()
            });

        return await utils.findItemByIdAndRemove(id);
    },

    update: async (item) => {

        await utils.findItemByIdAndUpdate(item);

        return await utils.findOne(item._id);
    }
};

const utils = {
    findItemByParentId: async (parentId) =>{
        return await Item.find({ parentId: parentId });
    },

    findItemAncesById: async (id) => {
        return await Item.find({ ancestors: id })
    },

    deleteManyItems: async (id) => {
        return await Item.deleteMany({ ancestors: id });
    },

    findItemById: async (id) => {
        return await Item.find({_id: id});
    },

    findOne: async (id) => {
        return await Item.findOne({ _id: id })
    },

    findItemByIdAndRemove: async (id) => {
        return await Item.findByIdAndRemove({_id: id})
    },

    findItemByIdAndUpdate: async (item) => {
        return await Item.findByIdAndUpdate({ _id: item._id }, item)
    }
};

module.exports = itemModel;