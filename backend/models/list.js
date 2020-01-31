const List = require('../schemas/list');
const repositoryClass = require('./itemAndListRepository');
const repository = new repositoryClass;

class listModel {

    async add (parentId) {

        let list = new List;

        list.parentId = parentId;
        let result = await repository.findItemByParentId(parentId);
        list.ancestors = result[0].ancestors.concat(parentId);

        return list.save();
    }

    async get () {

        const lists = await this.findAllList();
        let data = [];
        if(!lists.length) {
            const newList = await this.createList(null);
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

        return await this.findListByIdAndRemove(id);
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
}

module.exports = listModel;