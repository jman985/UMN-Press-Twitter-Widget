import { put, takeLatest  } from 'redux-saga/effects';
import axios from 'axios';

function* getTweets(action){
  try {
    yield console.log(action.payload);
    for (let i=0; i<action.payload.length; i++){
        const response = yield axios.get('/tweets/' + action.payload[i].title)
        // send the response(tweet id) and the publication object from database to the save saga
        yield put({ type: 'SAVE_TWEETS', payload: {tweetArray: response.data, publicationId: action.payload[i].id}});
        console.log('sending this to save tweet saga:', response.data)
    }
  } catch (error) {
      console.log('error with getting tweets', error);
  }
}

function* saveTweets(action){
  try {
    const tweets = action.payload.tweetArray
    for (let tweet of tweets){
      const tweetId = tweet.id
      const publicationId = action.payload.publicationId
      console.log('sending these to tweet save route:', {tweetId: tweetId, publicationId: publicationId})
      // yield axios.post('/tweets/save', {tweetId: tweet.id, publicationId: action.payload.publicationId});
    }
  } catch (error) {
      console.log('error with tweet save route', error);
  }
}


function* tweetSaga() {  
  yield takeLatest('FETCH_TWEETS', getTweets);
  yield takeLatest('SAVE_TWEETS', saveTweets);
}

export default tweetSaga;