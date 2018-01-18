// @flow

import rootReducers from './reducers/rootReducers';
import rootSaga from './sagas/rootSaga';

import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import type {Product} from '../types/Product-type';

export type RootState = {
    products: Array<Product>;
    isProductListLoading: boolean;
    error?: Error;
};

export type Action = {
    type: 'FETCH_INITIAL_DATA_SUCCEED';
    products: Array<Product>;    
} | {
    type: 'FETCH_MORE_DATA_SUCCEED';
    moreProducts: Array<Product>;
} | {
    type: 'FETCH_INITIAL_DATA_REQUESTED';
} | {
    type: 'FETCH_MORE_DATA_REQUESTED';
    page: number;
} | {
    type: 'FETCH_INITIAL_DATA_FAILED';
    error: Error;
} | {
    type: 'FETCH_MORE_DATA_FAILED';
    error: Error;
} | {
    type: 'INSERT_NEW_DATA_REQUESTED';
    newProduct: Product;
} | {
    type: 'UPDATE_DATA_REQUESTED';
    product: Product;
};

let sagaMiddleware = createSagaMiddleware();

export type Dispatch = (action: Action) => void;

function configureStore() {
  let store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
}
let store = configureStore();

export default store;