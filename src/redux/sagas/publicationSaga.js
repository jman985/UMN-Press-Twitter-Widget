import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getPublications(action){
  try {
    // gets all publications rows from database
    const response = yield axios.get('/publications');
    // puts all publication rows into Publication reducer
    yield put({ type: 'SET_PUBLICATIONS', payload: response.data});
    console.log('putting this in the publications reducer:', response.data)
  } catch (error) {
      console.log('error with getting publications', error);
  }
}

//this saga gets fired with every add component action
function* updateTimestamp(action){
  try {
      yield axios.put('/publications/timestamp');
      yield put({ type: 'FETCH_PUBLICATIONS'});
  }  catch (error) {
      console.log('Error with memory update:', error);
  }
}

function* publicationSaga() {
  yield takeLatest('FETCH_PUBLICATIONS', getPublications);
  yield takeLatest('UPDATE_TIMESTAMP', updateTimestamp);

}

export default publicationSaga;