const tweetIDReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TWEETS':
        return action.payload;
      case 'UNSET_TWEETS':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default tweetIDReducer;