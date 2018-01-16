// @flow

import {takeEvery, call, put} from 'redux-saga/effects';
import type {Action} from '../../stores/createStore';

let product = {
  id: 165,
  name: 'Nomania Diamond Simple Tee',
  price: '79.000',
  likes: 129,
  description: `Warna Black and White;Satu ukuran muat sampai size M;Lingkar dada 86 cm, Lebar bahu 36 cm, Panjang lengan 15 cm, Lingkar lengan 32 cm, Panjang 62 cm, Lingkar pinggang 86 cm;Bahan Kaos`
};

export default function* productSaga(): Generator<*, *, *> {
  yield takeEvery('FETCH_INITIAL_DATA_REQUESTED', getInitialProducts);
  yield takeEvery('FETCH_MORE_DATA_REQUESTED', getMoreData);
}

export function* getMoreData(action: Action): Generator<*, *, *> {
  try {
    // $FlowFixMe << happens because redux saga is not cleverly typed to read action    
    let moreProducts = yield call(fetchMore, action.page);
    yield put({
      type: 'FETCH_MORE_DATA_SUCCEED',
      moreProducts,
    });
  } catch (error) {
    yield put({
      type: 'FETCH_MORE_DATA_FAILED',
      error,
    });
  }
}

export function* getInitialProducts(): Generator<*, *, *> {
  try {
    let products = yield call(fetchInits);
    yield put({
      type: 'FETCH_INITIAL_DATA_SUCCEED',
      products,
    });
  } catch (error) {
    yield put({
      type: 'FETCH_INITIAL_DATA_FAILED',
      error,
    });
  }
}

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateRandomString() {
  let category = [
    'nature',
    'water',
    'sea',
    'flower',
    'fashion',
    'love',
    'dog',
    'dress',
    'city',
    'mountain',
  ];
  return `${category[Math.floor(Math.random() * 10)]},${category[Math.floor(Math.random() * 10)]}`;
};


export async function fetchInits() {
  let products = [];
  await timeout(2000);
  for (let i = 0; i < 5; i++) {
    products.push({
      ...product, 
      id: product.id + Math.random() * 100,
      image: `https://source.unsplash.com/880x880/?${generateRandomString()}`,
    });
  }
  return products;
}

export async function fetchMore(page: number) {
  await timeout(1000);
  console.log('Simulate Paging on REST', page);
  let products = [];
  for (let i = 0; i < 2; i++) {
    products.push({
      ...product, 
      id: product.id + Math.random() * 100,
      image: `https://source.unsplash.com/880x880/?${generateRandomString()}`,
    });
  }
  return products;
}
