// @flow

import type {RootState, Action} from '../createStore';

let initialState = {
    products: [],
    isProductListLoading: false,
};

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
        default: {
            return state;
        }
    }
}