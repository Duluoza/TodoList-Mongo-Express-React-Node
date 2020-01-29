import React from 'react';

import './todo-list.css';
import ItemAddForm from "../item-add-form";

const TodoList = ({elements,  onAddItem, listId}) => {

    return (
        <>
            <ul className='list-group todo-list'>
                { elements }
            </ul>
            <div className='wrapper__form'>
                <ItemAddForm
                    listId={listId}
                    addItem={onAddItem}
                />
            </div>
        </>
    )
};

export default TodoList