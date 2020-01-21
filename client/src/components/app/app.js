import React, {Component} from 'react';
import { Provider } from 'react-redux'
import store from "../../store";

import AppHeader from '../app-header';
import TodoList from '../todo-list';

import './app.css';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="todo-app">
                    <AppHeader />
                    <TodoList t_id={0}/>
                </div>
            </Provider>
        );
    };
};