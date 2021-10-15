import { FETCH_PLAYERS, ADD_PLAYER, DELETE_PLAYER } from "../actions/actions"

const playersReducer = (state = [], action) => {
  console.log('state: ', state);
  console.log('payload: ', action.payload);
  switch(action.type) {
    case FETCH_PLAYERS:
    return [action.payload.data];

    case ADD_PLAYER:
    return [action.payload.data];

    case DELETE_PLAYER:
    return [action.payload.data];

    default:
      return state;
  }
};

export default playersReducer;