const csvReducer = (state = { loaded: false }, action) => {
  switch (action.type) {
    case "SET_CSV_DATA":
      return {
        loaded: true,
        data: action.payload,
      };

    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default csvReducer;
