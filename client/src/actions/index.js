import { request } from '../api'

const setItems = items => async dispatch => {
    dispatch({type: 'SET_ITEMS', payload: items.data.data})
};

const setLists = lists => async dispatch => {
    dispatch({type: 'SET_LISTS', payload: lists.data.data})
};

const addItem = item => async dispatch => {
    let newItem =  await request.addItemRequest(item);
    dispatch({type: 'ADD_ITEM', payload: newItem.data.data})
};

const deleteItem = (id) => async dispatch => {
    let newItem = await request.deleteItemRequest(id);
    dispatch({type: 'DELETE_ITEM', payload: newItem.data.data._id})
};

const moveUpAndDown = (first, second, quantity) => async dispatch => {
    const firstMove = await request.moveUpItemRequest({...first, pos: first.pos - quantity});
    const secondMove = await request.moveUpItemRequest({...second, pos: second.pos + quantity});
    const resultMove = [firstMove.data.data, secondMove.data.data];
    if (quantity === 1) dispatch({type: 'MOVE_UP', payload: resultMove});
    if (quantity === -1) dispatch({type: 'MOVE_DOWN', payload: resultMove});
};

const addList = (id) => async dispatch => {
    let newList =  await request.addListRequest(id);
    dispatch({type: 'ADD_LIST', payload: newList.data.data})
};

const deleteList = (id) => async dispatch => {
    let delList =  await request.deleteListRequest(id);
    dispatch({type: 'DELETE_LIST', payload: delList.data.data._id})
};

export { addItem, deleteItem, addList, deleteList, setItems, setLists, moveUpAndDown }