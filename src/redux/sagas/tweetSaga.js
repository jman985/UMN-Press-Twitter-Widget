import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getTweets(action){
  try {
    yield console.log(action.payload);
    for (let i=0; i<action.payload.length; i++){
        const response = yield axios.get('/tweets/' + action.payload[i].title)
        // send the response(tweet id) and the publication object from database to the save saga
        yield put({ type: 'SAVE_TWEETS', payload: {tweetId: response.data, publicationId: action.payload[i].id}});
        console.log('sending this to save tweet saga:', response.data)
    }
  } catch (error) {
      console.log('error with getting tweets', error);
  }
}

function* saveTweets(action){
  try {
    const response = yield axios.get('/tweets/save', action.payload);
    console.log('sending this tweet to save route:', action.payload)
  } catch (error) {
      console.log('error with tweet save route', error);
  }
}


function* tweetSaga() {  
  yield takeLatest('FETCH_TWEETS', getTweets);
  yield takeLatest('SAVE_TWEETS', saveTweets);
}

export default tweetSaga;