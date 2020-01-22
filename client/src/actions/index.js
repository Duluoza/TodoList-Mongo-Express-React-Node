import axios from 'axios';

const setItems = items => async dispatch => {
    dispatch({type: 'SET_ITEMS', payload: items.data.data})
};

const setLists = lists => async dispatch => {
    dispatch({type: 'SET_LISTS', payload: lists.data.data})
};

const addItem = item => async dispatch => {
    let newItem =  await axios.post('http://localhost:3001/items/addItem', {
        label: item.label,
        parentId: item.t_id
    });
    dispatch({type: 'ADD_ITEM', payload: newItem.data.data})
};

const deleteItem = (id) => {

    return {
        type: "DELETE_ITEM",
        payload: id
    }
};

const moveUp = (item) => {

    return {
        type: "MOVE_UP",
        payload: item
    }
};

const moveDown = (item) => {

    return {
        type: "MOVE_DOWN",
        payload: item
    }
};

const addList = (id) => async dispatch => {
    let newList =  await axios.post('http://localhost:3001/lists/addList', {
        parentId: id
    });
    dispatch({type: 'ADD_LIST', payload: newList.data.data})
};

const deleteList = (id) => {

    return {
        type: "DELETE_LIST",
        payload: id
    }
};

export { addItem, deleteItem, moveUp, moveDown, addList, deleteList, setItems, setLists }