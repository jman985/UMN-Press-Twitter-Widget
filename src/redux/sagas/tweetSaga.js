import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* getTweets(action) {
  try {
    yield console.log(action.payload);
    for (let i=0; i<action.payload.length; i++){
      // check if the publication has include value of true
      if (action.payload[i].include){
        const response = yield axios.get('/tweets/twitter/' + action.payload[i].title)
        // send the response(tweet id) and the publication object from database to the save saga
        // console.log('this is title', action.payload[i].title)
        // console.log('this is response.data.body', response.data.body)
        // console.log('this is response.data.header', response.data.header)
        // save the tweet ids to the tweet table of the database
        yield put({
          type: "SAVE_TWEETS",
          payload: {
            tweetArray: response.data.body,
            publicationId: action.payload[i].id,
          },
        });
        // save the API rate info to the user table of the database
        yield put({
          type: "SAVE_RATE_DATA",
          payload: {
            rateLimit: response.data.header['x-rate-limit-limit'],
            rateLimitRemaining: response.data.header['x-rate-limit-remaining'],
            rateLimitReset: response.data.header['x-rate-limit-reset'],
            userId: action.userId
          }
        });
        // console.log(response)
        console.log("sending this to save tweet saga:", response.data.data);
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
    let tweets = action.payload.tweetArray;
    yield console.log(action.payload);
    // filter undefined results (no results from search)
    if (tweets !== undefined){
      // take each tweet id from the publicaiton search and save to database with associated publication id
      for (let tweet of tweets) {
        const tweetId = tweet.id;
        const publicationId = action.payload.publicationId;
        console.log("sending these to tweet save route:", {
          tweetId: tweetId,
          publicationId: publicationId,
        });
        yield axios.post("/tweets/database", {
          tweetId: tweetId,
          publicationId: publicationId,
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
