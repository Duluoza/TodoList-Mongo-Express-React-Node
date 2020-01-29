import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
});
export const request = {
    addItemRequest: ({label, listId}) => {
        return instance.post('items/addItem', {
            label: label,
            parentId: listId,});
    },

    deleteItemRequest: (id) => {
        return instance.post('items/deleteItem', { id: id })
    },

    moveUpItemRequest: (item) => {
        return instance.post('items/editItem', { item })
    },


    // remove: id => {
    //     return instance.delete('delete', {
    //         data: { id },
    //     });
    // },
    // update: objToUpd => {
    //     return instance.post('update', {
    //         objToUpd,
    //     });
    // },
    // removeSublist: id => {
    //     return instance.post('removeSublist', { id });
    // },
    // addSubList: id => {
    //     return instance.post('addSublist', { id });
    // },
    // getData: listId => {
    //     return instance.get(`${listId}`);
    // },
    // getNewList: () => {
    //     return instance.get(`me`);
    // },
};