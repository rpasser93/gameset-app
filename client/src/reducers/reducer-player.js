import { UPDATE_PLAYER_AVAILABILITY } from "../actions/actions"

const playerReducer = (state = [], action) => {
  console.log('Player Avail Red:', action.payload)
  switch(action.type) {
    case UPDATE_PLAYER_AVAILABILITY:
      return [action.payload.data];
    default:
      return state;
  }
};

export default playerReducer;