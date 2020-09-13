const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return !state;
    default:
      return state;
  }
};

export default loadingReducer;
