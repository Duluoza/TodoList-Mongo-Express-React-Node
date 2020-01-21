import axios from 'axios';

const addItem = item => async dispatch => {
    let newItem =  await axios.post('http://localhost:3001/items/putData', {
        label: item.label,
        parentId: item.t_id
    });
    
    console.log(newItem.data.data)
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

const addList = (id) => {

    return {
        type: "ADD_LIST",
        payload: id
    }
};

const deleteList = (id) => {

    return {
        type: "DELETE_LIST",
        payload: id
    }
};

export { addItem, deleteItem, moveUp, moveDown, addList, deleteList }