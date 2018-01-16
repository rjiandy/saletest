// @flow

import {fork} from 'redux-saga/effects';

import productSagaWatcher from './productSaga';

export default function* rootSaga(): Generator<*, *, *> {
  yield fork(productSagaWatcher);
};
