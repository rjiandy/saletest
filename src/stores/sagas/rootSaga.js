// @flow

import {fork} from 'redux-saga/effects';

import productSagaWatcher from './productSaga';
import CMSSagaWatcher from './CMSSaga';


export default function* rootSaga(): Generator<*, *, *> {
  yield fork(productSagaWatcher);
  yield fork(CMSSagaWatcher);
};
