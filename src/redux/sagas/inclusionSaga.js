import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

// toggles include value of a tweet between true & false
function* toggleInclusion(action){
    try {
        yield axios.put('/publications', {id: action.payload});
        yield put({type: 'FETCH_PUBLICATIONS'});
    } catch (error) {
        console.log('error with updating publication inclusion value:', error);
    }
}

// toggles include value of all tweets in database
function* toggleInclusionAll(action){
    try {
        yield axios.put('/publications/all', {include: action.payload});
        yield put({type: 'FETCH_PUBLICATIONS'});
    } catch (error) {
        console.log('error with updating publication inclusion value:', error);
    }
}

function* inclusionSaga() {
    yield takeLatest('PUBLICATION_TOGGLE_INCLUSION', toggleInclusion);
    yield takeLatest('PUBLICATION_TOGGLE_INCLUSION_ALL', toggleInclusionAll);

}

export default inclusionSaga;