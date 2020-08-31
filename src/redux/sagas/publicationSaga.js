import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getPublications(action){
  try {
    const response = yield axios.get('/publications');
    yield put({ type: 'SET_PUBLICATIONS', payload: response.data});
    console.log('putting this in the publications reducer:', response.data)
  } catch (error) {
      console.log('error with getting publications', error);
  }
}


function* publicationSaga() {
  yield takeLatest('FETCH_PUBLICATIONS', getPublications);
}

export default publicationSaga;