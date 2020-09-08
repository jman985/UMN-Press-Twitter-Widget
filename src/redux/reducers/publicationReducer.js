const publicationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PUBLICATIONS':
      return action.payload;
    default:
      return state;
  }
};


export default publicationReducer;
