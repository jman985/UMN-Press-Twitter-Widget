import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

// updates 'Approved' column from 'False' to 'True' or 'True' to 'False'
function* toggleInclusion(action){
    try {
        yield axios.put('/publications', {id: action.payload});
        yield put({type: 'FETCH_PUBLICATIONS'});
    } catch (error) {
        console.log('error with updating publication inclusion value:', error);
    }
}


function* inclusionSaga() {
    yield takeLatest('PUBLICATION_TOGGLE_INCLUSION', toggleInclusion);
}

export default inclusionSaga;