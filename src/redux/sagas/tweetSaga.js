import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* getTweets(action) {
  try {
    yield console.log(action.payload);
    for (let i=0; i<action.payload.length; i++){
      if (action.payload[i].include){
        //hit Twitter Recent Search API with publication title, replacing certian characters
        const response = yield axios.get('/tweets/twitter/' + action.payload[i].title.replace(/["&]/g,''))
        // send the response(tweet id) and the publication object from database to the save saga
        yield put({
          type: "SAVE_TWEETS",
          payload: {
            tweetArray: response.data,
            publicationId: action.payload[i].id,
          },
        });
        console.log("sending this to save tweet saga:", response.data);
      }
    }
  } catch (error) {
    console.log("error with getting tweets", error);
  }
}

// gets all saved Tweets from Tweet table
function* getDbTweets(action){
  try {
    const response = yield axios.get("/tweets/database/");
    // send the response(tweet id) and the publication object from database to the save saga
    yield put({ type: "STORE_ALL_TWEETS", payload: response.data });
    console.log("sending this to tweet reducer:", response.data);
  } catch (error) {
    console.log("error with getting tweets", error);
  }
}


// posts Tweets to Tweet table 
function* saveTweets(action){
  try {
    const tweets = action.payload.tweetArray;
    yield console.log(action.payload);
    for (let tweet of tweets) {

      if(tweet.possibly_sensitive===false){  //filter out sensitive content
             
        const tweetId = tweet.id;
        const publicationId = action.payload.publicationId;
        console.log("sending these to tweet save route:", {
          tweetId: tweetId,
          publicationId: publicationId,
        });
        yield axios.post("/tweets/database", {
          tweetId: tweet.id,
          publicationId: action.payload.publicationId,
        });
      }
    }
  } catch (error) {
    console.log("error with tweet save route", error);
  }
}

function* approveTweet(action){
  try {
    const response = yield axios.put('/tweets/database/approve', {id: action.payload})
  } catch (error) {
      console.log('error with approving tweet', error);
  }
}

function* rejectTweet(action){
  try {
    const response = yield axios.put('/tweets/database/reject', {id: action.payload})
  } catch (error) {
      console.log('error with rejecting tweet', error);
  }
}

function* tweetSaga() {  
  yield takeLatest('FETCH_TWEETS', getTweets);
  yield takeLatest('FETCH_DATABASE_TWEETS', getDbTweets);
  yield takeLatest('SAVE_TWEETS', saveTweets);
  yield takeLatest('APPROVE_TWEET', approveTweet);
  yield takeLatest('REJECT_TWEET', rejectTweet);
}

export default tweetSaga;
