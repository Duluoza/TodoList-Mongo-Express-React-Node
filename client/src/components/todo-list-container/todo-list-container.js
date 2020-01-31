import React, {useEffect} from 'react';
import {connect} from "react-redux";

import { request } from '../../api'
import TodoListItem from "../todo-list-item/todo-list-item";
import TodoList from "../todo-list";
import {addItem, setItems, setLists} from "../../actions";

const TodoListContainer = ({ items, onAddItem, onSetLists, onSetItems, listId}) => {

    const getItemsAndListsFromDb = async () => {
        const dataBaseItems = await request.getItems();
        onSetItems(dataBaseItems);
        const dataBaseLists = await request.getLists();
        onSetLists(dataBaseLists);
    };

    useEffect(() => {
        getItemsAndListsFromDb()
    }, []);

    const arrPosition = items.filter((item) => item.parentId === listId);

    const elements = arrPosition.sort((a, b)=> a.pos - b.pos)
        .map((item) => {
            const {_id, ...itemProps} = item;
            return(
                <li key={_id}
                    className='list-group-item'>
                    <TodoListItem
                        {...itemProps}
                        id={_id}
                        arrPosition={arrPosition}
                    />
                </li>
            );
        });
    return (
        <TodoList elements={elements} listId={listId} onAddItem={onAddItem} />
    )
};

const mapStateToProps = (state) => ({
    items: state.items,
});

const mapDispatchToProps = (dispatch) => ({
    onAddItem: item => dispatch(addItem(item)),
    onSetLists: lists => dispatch(setLists(lists)),
    onSetItems: items => dispatch(setItems(items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);