import { ADD_TEAM } from "../actions/actions"

const teamsReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_TEAM:
      return [action.payload.data, ...state];
    default:
      return state;
  }
};

export default teamsReducer