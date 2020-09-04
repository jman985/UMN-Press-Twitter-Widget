import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// get all Tweets IDs in Tweet in table
function* fetchTweetIDs(action){
    try { 
        console.log('querying with', action.payload);
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('/api/tweets/' + action.payload);
        console.log('response from server: ', response.data);
        yield put({type:'SET_TWEETS', payload: response.data});
    }
    catch (error) {
        console.log('Error with fetchTweetIDs Saga:', error);
    }
}

function* getTweetIDSaga() {
    yield takeLatest('FETCH_TWEET_ID', fetchTweetIDs);
}
  
export default getTweetIDSaga;