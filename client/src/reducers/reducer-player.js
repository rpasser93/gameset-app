import { UPDATE_PLAYER_AVAILABILITY, UPDATE_PLAYER_LINEUP } from "../actions/actions"

const playerReducer = (state = [], action) => {
  switch(action.type) {
    case UPDATE_PLAYER_AVAILABILITY:
      return [action.payload.data];
    case UPDATE_PLAYER_LINEUP:
      return [action.payload.data];
    default:
      return state;
  }
};

export default playerReducer;