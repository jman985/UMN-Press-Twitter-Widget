const tweetIDReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TWEET_IDS':
        return action.payload;
      case 'UNSET_TWEET_IDS':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default tweetIDReducer;