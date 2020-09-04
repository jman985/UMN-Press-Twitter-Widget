const dbTweetReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_ALL_TWEETS':
      return action.payload;
    default:
      return state;
  }
};


export default dbTweetReducer;
