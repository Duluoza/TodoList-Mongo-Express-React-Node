import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
});
export const request = {
    addItemRequest: ({label, listId}) => {
        return instance.post('items/add', {
            label: label,
            parentId: listId,});
    },

    deleteItemRequest: (id) => {
        return instance.post('items/delete', { id: id })
    },

    moveUpItemRequest: (item) => {
        return instance.patch('items/edit', item)
    },

    addListRequest: (id) => {
        return instance.post('lists/add', { parentId: id })
    },

    deleteListRequest: (id) => {
        return instance.post('lists/delete', { id: id })
    }
};