const bookDataReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_BOOK_DATA':
        return action.payload;
      case 'UNSET_BOOK_DATA':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default bookDataReducer;