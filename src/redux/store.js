import {createStore, applyMiddleware} from 'redux';
//redux-log
import thunk from 'redux-thunk';
import reducer from './reducers';

const middleware = [thunk];
export const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)