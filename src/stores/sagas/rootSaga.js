// @flow

import {fork} from 'redux-saga/effects';

import productSaga from './productSaga';

let root = function* rootSaga(): Generator<*, *, *> {
  yield fork(productSaga);
};

export default root;