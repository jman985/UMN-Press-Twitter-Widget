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
      console.log('error with setting publications to reducer', error);
  }
}

//this saga gets fired with every add component action
function* updateTimestamp(action){
  try {
      yield axios.put('/publications/timestamp');
      yield put({ type: 'FETCH_PUBLICATIONS'});
  }  catch (error) {
      console.log('Error fetching publications:', error);
  }
}

// updates publication search_type
function* changeSearchType(action){
  try {
      yield axios.put('/publications/searchtype', {id: action.payload.id, searchType: action.payload.searchType});
      yield put({type: 'FETCH_PUBLICATIONS'});
  } catch (error) {
      console.log('error with search type change:', error);
  }
}

function* changeAllSearchType(action){
  try {
      yield axios.put('/publications/searchtypeall', {searchType: action.payload});
      yield put({type: 'FETCH_PUBLICATIONS'});

  } catch (error) {
      console.log('error changing all search types:', error);
  }
}


function* publicationSaga() {
  yield takeLatest('FETCH_PUBLICATIONS', getPublications);
  yield takeLatest('UPDATE_TIMESTAMP', updateTimestamp);
  yield takeLatest('CHANGE_SEARCH_TYPE', changeSearchType)
  yield takeLatest('CHANGE_ALL_SEARCH_TYPES', changeAllSearchType)
}

export default publicationSaga;