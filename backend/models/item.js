const Item = require('../schemas/item');
const repositoryClass = require('./itemAndListRepository');
const repository = new repositoryClass;

class itemModel {

    constructor(){
        this.repo = new repositoryClass('Item')
    }

    async add (label, parentId) {

        let item = new Item();

        item.label = label;
        item.parentId = parentId;

        let position = await repository.findItemByParentId(parentId);
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

        const deleteItem = await repository.findItemById(id);
        let parentId = deleteItem[0].parentId;
        let pos = deleteItem[0].pos;
        const items = await repository.findItemByParentId(parentId);
        items.filter(item => item.id !== id)
            .forEach(item => {
                if(item.pos > pos) item.pos -= 1;
                item.save()
            });

        return await repository.findItemByIdAndRemove(id);
    }

    async update (item) {

        await repository.findItemByIdAndUpdate(item);

        return await repository.findItemById(item._id);
    }

    async get () {
        return await repository.findAllItems();
    }
}

module.exports = itemModel;