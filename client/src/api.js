import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
});
export const request = {

    getItems: () => {
        return instance.get('http://localhost:3001/items')
    },

    getLists: () => {
        return instance.get('http://localhost:3001/lists')
    },

    addItemRequest: ({label, listId}) => {
        return instance.post('items', {
            label: label,
            parentId: listId,});
    },

    deleteItemRequest: (id) => {
        return instance.delete(`items/${id}`)
    },

    moveUpItemRequest: (item) => {
        return instance.patch('items', item)
    },

    addListRequest: (id) => {
        return instance.post('lists', { parentId: id })
    },

    deleteListRequest: (id) => {
        return instance.post(`lists/${id}`)
    }
};