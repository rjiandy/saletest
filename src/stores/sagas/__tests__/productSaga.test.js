import {takeEvery, call, put} from 'redux-saga/effects';

import watcher, {getMoreDataSaga, getInitialProductsSaga, fetchInits, fetchMore} from '../productSaga';

it('Should watch the correct action', () => {
  let watcherGen = watcher();
  expect(watcherGen.next().value).toEqual(
    takeEvery('FETCH_INITIAL_DATA_REQUESTED', getInitialProductsSaga)
  );
  expect(watcherGen.next().value).toEqual(
    takeEvery('FETCH_MORE_DATA_REQUESTED', getMoreDataSaga)
  );
});


it('Should get initialProductSaga and call the right function', () => {
  let gen = getInitialProductsSaga();
  let mockProducts = [{
    id: 123,
  }];
  expect(gen.next().value).toEqual(
    call(fetchInits)
  );
  expect(gen.next(mockProducts).value).toEqual(
    put({
      type: 'FETCH_INITIAL_DATA_SUCCEED',
      products: mockProducts,
    })
  );
  
  let throwingGen = getInitialProductsSaga();
  let mockError = new Error('Error on getting Data');

  throwingGen.next(); // NOTE: So the saga go inside the try catch and then it will be catched by catch inside the saga
  expect(throwingGen.throw(mockError).value).toEqual(
    put({
      type: 'FETCH_INITIAL_DATA_FAILED',
      error: mockError,
    })
  );
});

it('Should get moreProducts and call the right function', () => {
  let gen = getMoreDataSaga({page: 1});
  let mockProduct = [{
    id: 2222,
  }];
  expect(gen.next().value).toEqual(
    call(fetchMore, 1)
  );
  expect(gen.next(mockProduct).value).toEqual(
    put({
      type: 'FETCH_MORE_DATA_SUCCEED',
      moreProducts: mockProduct,
    })
  );

  let throwingGen = getMoreDataSaga({page: 1});
  let mockError = new Error('Something happened');
  throwingGen.next();
  expect(throwingGen.throw(mockError).value).toEqual(
    put({
      type: 'FETCH_MORE_DATA_FAILED',
      error: mockError,
    })
  );
});