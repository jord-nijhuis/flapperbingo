//Stylesheets
import './Style/style.scss'

//Dependencies
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

//App
import {App} from './Components/app';
import bingoReducers from './Reducers/index'

console.log("Flapperbingo v" + VERSION + " (build environment: " + ENV + ", time of build: " + BUILD_TIME + ")");

let store = createStore(bingoReducers);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
