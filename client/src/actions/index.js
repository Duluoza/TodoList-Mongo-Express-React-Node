import axios from 'axios';

// const addItem = (item) => {
//     return {
//         type: "ADD_ITEM",
//         payload: item
//     }
// };

const addItem = item => dispatch => {
    console.log('item', item);
    axios.post('http://localhost:3001/api/putData', {
        label: item.label,
        id: item.id
    });

    // dispatch({ type: "ADD_ITEM", newItem })

// .then(() => {
//         dispatch({ type: 'del-item', parent })
//     });

    // return {
    //     type: "ADD_ITEM",
    //     payload: item
    // }
};

const deleteItem = (id) => {
    console.log(id)

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
    console.log(id);


    return {
        type: "ADD_LIST",
        payload: id
    }
};

const deleteList = (id) => {
    console.log(id);

    return {
        type: "DELETE_LIST",
        payload: id
    }
};

export { addItem, deleteItem, moveUp, moveDown, addList, deleteList }