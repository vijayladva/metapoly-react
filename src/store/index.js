import {createStore, compose, combineReducers} from 'redux';
import common from "./reducers/common";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers();
const store = createStore(
    combineReducers({ common})
);

export default store;
