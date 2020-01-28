import React, {Component} from 'react';
import { Provider } from 'react-redux'
import store from "../../store";
import Wrapper from '../wrapper';

import './app.css';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Wrapper />
            </Provider>
        );
    };
};

