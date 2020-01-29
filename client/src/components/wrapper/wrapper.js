import React from 'react'
import { useSelector } from 'react-redux'

import AppHeader from '../app-header';
import TodoListContainer from '../todo-list-container';

const Wrapper = () => {
    const result = useSelector(state => state.lists);

    return (
        <div className="todo-app">
            <AppHeader />
            <TodoListContainer listId={result && result.length && result[0]._id}/>
        </div>
    )
};

export default Wrapper;