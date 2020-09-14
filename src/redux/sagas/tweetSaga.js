import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* getTweets(action) {
  try {
    yield put({ type: 'START_LOADING', payload: action.limit})
    yield console.log(action.payload);
    let searchAmount = action.limit 
    // if the user has set the search limit to be greater than the total amount of publications
    // change the search limit to match the total amount of publications
    if (action.limit > action.payload.length) {
      searchAmount = action.payload.length
    }
    for (let i=0; i<searchAmount; i++){
      yield put({ type: 'INCREASE_SEARCH_COUNT'})
      //hit Twitter Recent Search API with publication title, replace problem characters with "*" aka the "wild card" character
      //then normalize to replace å/a,ö/o, etc.
      // console.log('this is the API query', action.payload[i].title.replace(/["&;#^%[\|{}]/g,'*').replace(/]/g,'*').normalize('NFKD').replace(/[^\w\s.-_\*/']/g, ''));
      // let str= "['&;#^%[\|/{}]";
      // console.log('this is the normalize test', str.replace(/["&;#^%[\|/{}]/g,'*').replace(/]/g,'*').normalize('NFKD').replace(/[^\w\s.-_\*/']/g, ''));
      let response = 0
      let title = encodeURIComponent(action.payload[i].title.replace(/["&;#^%[\|/{}]/g,'*').replace(/]/g,'*').normalize('NFKD').replace(/[^\w\s.-_\*/']/g, ''));
      let author = ''
      // subtitle is initially declared as the title for cases in which there is no subtitle
      let subtitle = title
      if (action.payload[i].subtitle.length > 0){
        subtitle = encodeURIComponent(action.payload[i].subtitle.replace(/["&;#^%[\|/{}]/g,'*').replace(/]/g,'*').normalize('NFKD').replace(/[^\w\s.-_\*/']/g, ''));
      }
      let authorArr = action.payload[i].author1.split(',')
      if (authorArr.length > 1){
        author = encodeURIComponent(authorArr[0].replace(/["&;#^%[\|/{}]/g,'*').replace(/]/g,'*').normalize('NFKD').replace(/[^\w\s.-_\*/']/g, ''))
      } else {author = encodeURIComponent(action.payload[i].author1.replace(/["&;#^%[\|/{}]/g,'*').replace(/]/g,'*').normalize('NFKD').replace(/[^\w\s.-_\*/']/g, ''))}
      switch(action.payload[i].search_type) {
        // Exact Match Title
        case 'T':
          response = yield axios.get('/tweets/twitter/' + `"${title}"`);
        break;
        // Exact Title AND Exact Author Last Name
        case 'TaA':
          response = yield axios.get('/tweets/twitter/' + `"${title}" "${author}"`);
        break;
        // Exact Title AND Exact Subtitle
        case 'TaS':
          response = yield axios.get('/tweets/twitter/' + `"${title}" "${subtitle}"`);
        break;
        // Exact Title OR Exact Subtitle  
        case 'ToS':
          response = yield axios.get('/tweets/twitter/' + `"${title}" OR "${subtitle}"`);
        break;
        // Exact Subtitle
        case 'S':
          response = yield axios.get('/tweets/twitter/' + `"${subtitle}"`);
        break;
        // Exact Subtitle AND Exact Author Last Name
        case 'SaA':
          response = yield axios.get('/tweets/twitter/' + `"${subtitle}" "${author}"`);
        break;
        // Exact Title AND Author Last Name OR Subtitle
        case 'TaAoS':
          response = yield axios.get('/tweets/twitter/' + `"${title}" "${author}" OR "${subtitle}"`);
      }
      // send the response(tweet id) and the publication object from database to the save saga
      // save the tweet ids to the tweet table of the database
      if (response.data.body !== undefined){
        yield put({
          type: "SAVE_TWEETS",
          payload: {
            tweetArray: response.data.body,
            publicationId: action.payload[i].id,
          },
        });
      }
      // save the API rate info to the user table of the database on the last repitition
      if (i === searchAmount-1){
        yield put({
          type: "SAVE_RATE_DATA",
          payload: {
            rateLimit: response.data.header['x-rate-limit-limit'],
            rateLimitRemaining: response.data.header['x-rate-limit-remaining'],
            rateLimitReset: response.data.header['x-rate-limit-reset'],
            userId: action.userId
          }
        });
      }
      // console.log(response)
      console.log("sending this to save tweet saga:", response.data.data);
      // update the last_searched timestamp of each publication
      yield axios.put('/publications/timestamp/' + action.payload[i].id )
    
      // update the user redux store with the new rate data
      yield put({ type: "FETCH_USER" });
      // update the publication redx store with new last_searched times
      yield put({ type: 'FETCH_PUBLICATIONS'})
    }
    yield put({ type: 'RESET_LOADING'})
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


function onlyRetweets(tweet){  //check if tweet is only retweets
  // console.log('this is tweet id', tweet.id);
  // console.log('this is referenced tweets', tweet.referenced_tweets);
  if(tweet.hasOwnProperty('referenced_tweets')){
      for(let j=0;j<tweet.referenced_tweets.length;j++){
        // console.log('this is the ref tweets type',tweet.referenced_tweets[j].type);
          if(tweet.referenced_tweets[j].type==='quoted'||tweet.referenced_tweets[j].type==='replied_to'){
            return false;
          }
      }
      return true;
    }else{
      return false;
  }
}//end onlyRetweets



// posts Tweets to Tweet table 
function* saveTweets(action){
  try {
    let tweets = action.payload.tweetArray;
    yield console.log(action.payload);
  // filter undefined results (no results from search)
    if (tweets !== undefined){
       // take each tweet id from the publication search and save to database with associated publication id
      for (let tweet of tweets) {
        const tweetId = tweet.id;
        const publicationId = action.payload.publicationId;
        //filter out sensitive tweets and retweets
        if(tweet.possibly_sensitive === false && !onlyRetweets(tweet)){ 
          console.log("sending these to tweet save route:", {
            tweetId: tweetId,
            publicationId: publicationId,
          });
          yield axios.post("/tweets/database", {
            tweetId: tweetId,
            publicationId: publicationId,
          });
        }
        yield put({ type:'FETCH_DATABASE_TWEETS'});
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
  yield put({ type:'FETCH_DATABASE_TWEETS'});
}

function* rejectTweet(action){
  try {
    const response = yield axios.put('/tweets/database/reject', {id: action.payload})
  } catch (error) {
    console.log('error with rejecting tweet', error);
  }
  yield put({ type:'FETCH_DATABASE_TWEETS'});
}

function* tweetSaga() {  
  yield takeLatest('FETCH_TWEETS', getTweets);
  yield takeLatest('FETCH_DATABASE_TWEETS', getDbTweets);
  yield takeLatest('SAVE_TWEETS', saveTweets);
  yield takeLatest('APPROVE_TWEET', approveTweet);
  yield takeLatest('REJECT_TWEET', rejectTweet);
}

export default tweetSaga;
