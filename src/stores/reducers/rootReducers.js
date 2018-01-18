// @flow

import type {RootState, Action} from '../createStore';

let initialState = {
    products: [],
    isProductListLoading: false,
};
// NOTE: Didn't use combineReducers because the reducers is simple enough
export default function rootReducers(state: RootState = initialState, action: Action) {
    switch(action.type) {
        case 'FETCH_INITIAL_DATA_REQUESTED': {
            return {
                ...state,
                isProductListLoading: true,
            }
        }
        case 'FETCH_INITIAL_DATA_SUCCEED': {
            let {products} = action;
            return {
                products,
                isProductListLoading: false,
            }
        }
        case 'FETCH_INITIAL_DATA_FAILED': {
            return {
                products: [],
                error: action.error,
                isProductListLoading: false,
            }
        }
        case 'FETCH_MORE_DATA_SUCCEED': {
            let {products} = state;
            return {
                products: [...products, ...action.moreProducts],
            }
        }
        case 'UPDATE_DATA_REQUESTED':
        case 'INSERT_NEW_DATA_REQUESTED': {
            return {
                ...state,
                isProductListLoading: true,
            };
        }
        case 'INSERT_NEW_DATA_SUCCEED': {
            return {
                isProductListLoading: false,
                products: [...state.products, action.newProduct],
            };
        }
        case 'UPDATE_DATA_SUCCEED': {
            return {
                isProductListLoading: false,
                products: action.products,
            }
        }
        default: {
            return state;
        }
    }
}