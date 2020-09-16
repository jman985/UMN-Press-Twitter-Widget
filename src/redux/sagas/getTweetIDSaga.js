import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// get all Tweets IDs in Tweet in table
function* fetchTweetIDs(action){
  try{
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/tweets/' + action.payload);
    yield put({type:'SET_TWEET_IDS', payload: response.data});
  }
  catch (error) {
    console.log('Error with fetchTweetIDs Saga:', error);
  }
}

function* getTweetIDSaga() {
  yield takeLatest('FETCH_TWEET_IDS', fetchTweetIDs);
}
  
export default getTweetIDSaga;