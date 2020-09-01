import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* toggleInclusion(action){
  try {
    yield axios.put('/publications', {id: action.payload});
  } catch (error) {
      console.log('error with bookmark add saga:', error);
  }
}


function* inclusionSaga() {
  yield takeLatest('PUBLICATION_TOGGLE_INCLUSION', toggleInclusion);
}

export default inclusionSaga;