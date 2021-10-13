import { UPDATE_PLAYER_AVAILABILITY } from "../actions/actions"

const playerReducer = (state = [], action) => {
  switch(action.type) {
    case UPDATE_PLAYER_AVAILABILITY:
      return [action.payload.data];
    default:
      return state;
  }
};

export default playerReducer;