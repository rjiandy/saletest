// @flow

import {takeEvery, put, select} from 'redux-saga/effects';
import type {Action} from '../../stores/createStore';

export default function* productSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('INSERT_NEW_DATA_REQUESTED', insertNewProductSaga);
  yield takeEvery('UPDATE_DATA_REQUESTED', updateProductSaga);
}

function* insertNewProductSaga(action: Action): Generator<*, *, *> {
  try {
    // DO API Communication here to insert newProduct 
    yield put({
      type: 'INSERT_NEW_DATA_SUCCEED',
      // $FlowFixMe << happens because redux saga is not cleverly typed to read action   
      newProduct: action.newProduct,
    });
  } catch (error) {
    yield put({
      type: 'INSERT_NEW_DATA_FAILED',
      error,
    });
  }
}

function* updateProductSaga(action: Action): Generator<*, *, *> {
  let products = yield select((state) => state.products);
  try {
    let updatedProducts = products.map((product) => {
      // $FlowFixMe
      if (product.id === action.product.id) {
        // $FlowFixMe
        return action.product
      } else {
        return product
      }
    })
    yield put({
      type: 'UPDATE_DATA_SUCCEED',
      // $FlowFixMe << happens because redux saga is not cleverly typed to read action   
      products: updatedProducts,
    });
  } catch (error) {
    yield put({
      type: 'UPDATE_DATA_FAILED',
      error
    });
  }
}