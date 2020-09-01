import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getTweets(action){
  try {
    const response = yield axios.get('/tweets');
    yield put({ type: 'SET_TWEETS', payload: response.data});
    console.log('sending this to tweet reducer:', response.data)
  } catch (error) {
      console.log('error with getting tweets', error);
  }
}


function* tweetSaga() {
  yield takeLatest('FETCH_TWEETS', getTweets);
}

export default tweetSaga;