const publicationReducer = (state = [1,2,3], action) => {
  switch (action.type) {
    case 'SET_PUBLICATIONS':
      return action.payload;
    default:
      return state;
  }
};


export default publicationReducer;
