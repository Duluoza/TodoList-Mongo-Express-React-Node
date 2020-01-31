const Item = require('../schemas/item');
const repositoryClass = require('./itemAndListRepository');
const repository = new repositoryClass;

class itemModel {

    async add (label, parentId) {

        let item = new Item();

        item.label = label;
        item.parentId = parentId;

        let position = await this.findItemByParentId(parentId);
        item.pos = position.length;

        let parent = await repository.findListByParentId(parentId);
        item.ancestors = parent[0].ancestors.concat(parentId);

        return item.save();
    }

    async delete (id) {

        const listAncestors  = await repository.findListAncesById(id);
        if(listAncestors.length) await repository.deleteManyLists(id);

        const itemAncestors = await repository.findItemAncesById(id);
        if(itemAncestors.length) await repository.deleteManyItems(id);

        const deleteItem = await this.findItemById(id);
        let parentId = deleteItem[0].parentId;
        let pos = deleteItem[0].pos;
        const items = await this.findItemByParentId(parentId);
        items.filter(item => item.id !== id)
            .forEach(item => {
                if(item.pos > pos) item.pos -= 1;
                item.save()
            });

        return await this.findItemByIdAndRemove(id);
    }

    async update (item) {

        await this.findItemByIdAndUpdate(item);

        return await this.findItemById(item._id);
    }

    async get () {
        return await this.findAllItems();
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

module.exports = itemModel;