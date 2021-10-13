import { FETCH_TEAM_BY_LOGIN } from "../actions/actions"

const teamReducer = (state = [], action) => {
  switch(action.type) {
    case FETCH_TEAM_BY_LOGIN:
      return [action.payload.data];
    default:
      return state;
  }
};

export default teamReducer;