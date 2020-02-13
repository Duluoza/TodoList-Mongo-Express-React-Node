const List = require('../schemas/list');
const repositoryClass = require('./itemAndListRepository');

class listModel {

    constructor(){
        this.repo = new repositoryClass
    }

    async add (parentId) {

        let list = new List;

        list.parentId = parentId;
        let result = await this.repo.findItemByParentIdForId(parentId);
        list.ancestors = result[0].ancestors.concat(parentId);

        return list.save();
    }

    async get () {

        const lists = await this.repo.findAllList();
        let data = [];
        if(!lists.length) {
            const newList = await this.repo.createList(null);
            data.push(newList);
        } else {
            data = [...lists];
        }

        return data;
    }

    async delete (id) {

        const listAncestors  = await this.repo.findListAncesById(id);
        if(listAncestors.length) await this.repo.deleteManyLists(id);

        const itemAncestors = await this.repo.findItemAncesById(id);
        if(itemAncestors.length) await this.repo.deleteManyItems(id);

        return await this.repo.findListByIdAndRemove(id);
    }
}

module.exports = listModel;