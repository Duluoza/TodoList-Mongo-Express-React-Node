const List = require('../schemas/list');
const repositoryClass = require('./itemAndListRepository');
const repository = new repositoryClass;

class listModel {

    async add (parentId) {

        let list = new List;

        list.parentId = parentId;
        let result = await repository.findItemByParentIdForId(parentId);
        list.ancestors = result[0].ancestors.concat(parentId);

        return list.save();
    }

    async get () {

        const lists = await repository.findAllList();
        let data = [];
        if(!lists.length) {
            const newList = await repository.createList(null);
            data.push(newList);
        } else {
            data = [...lists];
        }

        return data;
    }

    async delete (id) {

        const listAncestors  = await repository.findListAncesById(id);
        if(listAncestors.length) await repository.deleteManyLists(id);

        const itemAncestors = await repository.findItemAncesById(id);
        if(itemAncestors.length) await repository.deleteManyItems(id);

        return await repository.findListByIdAndRemove(id);
    }
}

module.exports = listModel;