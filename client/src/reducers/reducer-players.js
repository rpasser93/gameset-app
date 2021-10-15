import { FETCH_PLAYERS, ADD_PLAYER, DELETE_PLAYER } from "../actions/actions"

const playersReducer = (state = [], action) => {
  switch(action.type) {
    case FETCH_PLAYERS:
      return action.payload.data;

    case ADD_PLAYER:
      return [...state, action.payload.data];

    case DELETE_PLAYER:
     return state.filter((player) => {
       return player._id !== action.payload.data;
     });

    default:
      return state;
  }
};

export default playersReducer;