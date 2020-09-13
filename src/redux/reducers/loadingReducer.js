const loadingReducer = (state = {loading: false, count: 0, newTweets: 0, limit: 0}, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {loading: true, count: state.count, newTweets: state.newTweets, limit: action.payload};
    case 'INCREASE_SEARCH_COUNT':
      return {loading: state.loading, count: state.count + 1, newTweets: state.newTweets, limit: state.limit};
    case 'ADD_NEW_TWEET_COUNT':
      return {loading: state.loading, count: state.count, newTweets: state.newTweets +1, limit: state.limit};
    case 'RESET_LOADING':
      return {loading: false, count: 0, newTweets: 0, limit: 0};
    default:
      return state;
  }
};

export default loadingReducer;
