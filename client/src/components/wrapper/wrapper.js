import React from 'react'
import { useSelector } from 'react-redux'

import AppHeader from '../app-header';
import TodoList from '../todo-list';

const Wrapper = () => {
    const result = useSelector(state => state.lists);

    return (
        <div className="todo-app">
            <AppHeader />
            <TodoList t_id={result && result.length && result[0]._id}/>
        </div>
    )
};

export default Wrapper;