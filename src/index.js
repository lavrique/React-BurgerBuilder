import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import ingredientsReducer from './store/reducers/ingredients'

const store = createStore(ingredientsReducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__())

const app = (
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider >
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
