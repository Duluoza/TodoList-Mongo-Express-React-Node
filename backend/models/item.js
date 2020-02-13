const Item = require('../schemas/item');
const repositoryClass = require('./itemAndListRepository');

class itemModel {

    constructor(){
        this.repo = new repositoryClass
    }

    async add (label, parentId) {

        let item = new Item();

        item.label = label;
        item.parentId = parentId;

        let position = await this.repo.findItemByParentId(parentId);
        item.pos = position.length;

        let parent = await this.repo.findListByParentId(parentId);
        item.ancestors = parent[0].ancestors.concat(parentId);

        return item.save();
    }

    async delete (id) {

        const listAncestors  = await this.repo.findListAncesById(id);
        if(listAncestors.length) await this.repo.deleteManyLists(id);

        const itemAncestors = await this.repo.findItemAncesById(id);
        if(itemAncestors.length) await this.repo.deleteManyItems(id);

        const deleteItem = await this.repo.findItemById(id);
        let parentId = deleteItem[0].parentId;
        let pos = deleteItem[0].pos;
        const items = await this.repo.findItemByParentId(parentId);
        items.filter(item => item.id !== id)
            .forEach(item => {
                if(item.pos > pos) item.pos -= 1;
                item.save()
            });

        return await this.repo.findItemByIdAndRemove(id);
    }

    async update (item) {

        await this.repo.findItemByIdAndUpdate(item);

        return await this.repo.findItemById(item._id);
    }

    async get () {
        return await this.repo.findAllItems();
    }
}

module.exports = itemModel;