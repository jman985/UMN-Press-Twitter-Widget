import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import csvReducer from "./csvReducer";
import publication from './publicationReducer';
import tweets from './tweetsReducer';
import bookData from './bookDataReducer'
import loading from './loadingReducer'
import dbTweets from './dbTweetReducer';
import selectTweetID from './tweetidReducer'
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga


const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  csvReducer, // holds csv publication data for the preview before moving it to database upon approval
  publication, // contains all publications from database 'publication' table
  tweets, // contains tweets returned from Axios request to Twitter API
  dbTweets, // contains all tweets pulled from local database "tweet" table
  loading, // toggles bool when twitter search begins/ends to control loading overlay
  bookData,
  selectTweetID
});

export default rootReducer;
