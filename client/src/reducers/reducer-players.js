import { FETCH_PLAYERS } from "../actions/actions"

const playersReducer = (state = [], action) => {
  switch(action.type) {
    case FETCH_PLAYERS:
      return [action.payload.data];
    default:
      return state;
  }
};

export default playersReducer;