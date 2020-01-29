import axios from 'axios';
import { request } from '../api'

const setItems = items => async dispatch => {
    dispatch({type: 'SET_ITEMS', payload: items.data.data})
};

const setLists = lists => async dispatch => {
    dispatch({type: 'SET_LISTS', payload: lists.data.data})
};

// const addItem = item => async dispatch => {
//     let newItem =  await axios.post('http://localhost:3001/items/addItem', {
//         label: item.label,
//         parentId: item.listId,
//     });
//     dispatch({type: 'ADD_ITEM', payload: newItem.data.data})
// };

const addItem = item => async dispatch => {
    let newItem =  await request.addItemRequest(item);
    dispatch({type: 'ADD_ITEM', payload: newItem.data.data})
};

// const deleteItem = (id) => async dispatch => {
//     let newItem = await axios.post('http://localhost:3001/items/deleteItem', { id: id });
//     dispatch({type: 'DELETE_ITEM', payload: newItem.data.data._id})
// };

const deleteItem = (id) => async dispatch => {
    let newItem = await request.deleteItemRequest(id);
    dispatch({type: 'DELETE_ITEM', payload: newItem.data.data._id})
};

// const moveUp = (first, second) => async dispatch => {
//     const firstUp = await axios.patch("http://localhost:3001/items/editItem", {...first, pos: first.pos - 1});
//     const secondUp = await axios.patch("http://localhost:3001/items/editItem", {...second, pos: second.pos + 1});
//     const resultUp = await Promise.all([firstUp, secondUp]);
//     dispatch({type: 'MOVE_UP', payload: resultUp})
// };

const moveUp = (first, second) => async dispatch => {
    const firstUp = await axios.patch("http://localhost:3001/items/editItem", {...first, pos: first.pos - 1});
    const secondUp = await axios.patch("http://localhost:3001/items/editItem", {...second, pos: second.pos + 1});
    const resultUp = await Promise.all([firstUp, secondUp]);
    dispatch({type: 'MOVE_UP', payload: resultUp})
};

const moveDown = (first, second) => async dispatch => {
    const firstDown = await axios.patch("http://localhost:3001/items/editItem", {...first, pos: first.pos + 1});
    const secondDown = await axios.patch("http://localhost:3001/items/editItem", {...second, pos: second.pos - 1});
    const resultDown = await Promise.all([firstDown, secondDown]);
    dispatch({type: 'MOVE_DOWN', payload: resultDown})
};

const addList = (id) => async dispatch => {
    let newList =  await axios.post('http://localhost:3001/lists/addList', { parentId: id });
    dispatch({type: 'ADD_LIST', payload: newList.data.data})
};

const deleteList = (id) => async dispatch => {
    let delList =  await axios.post('http://localhost:3001/lists/deleteList', { id: id });
    dispatch({type: 'DELETE_LIST', payload: delList.data.data._id})
};

export { addItem, deleteItem, moveUp, moveDown, addList, deleteList, setItems, setLists }