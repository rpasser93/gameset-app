import { UPDATE_PLAYER_FIRSTNAME, UPDATE_PLAYER_LASTNAME, UPDATE_PLAYER_SEX, UPDATE_PLAYER_AVAILABILITY, UPDATE_PLAYER_LINEUP } from "../actions/actions"

const playerReducer = (state = [], action) => {
  switch(action.type) {
    case UPDATE_PLAYER_FIRSTNAME:
      return [action.payload.data];

    case UPDATE_PLAYER_LASTNAME:
      return [action.payload.data];

    case UPDATE_PLAYER_SEX:
      return [action.payload.data];

    case UPDATE_PLAYER_AVAILABILITY:
      return [action.payload.data];

    case UPDATE_PLAYER_LINEUP:
      return [action.payload.data];

    default:
      return state;
  }
};

export default playerReducer;