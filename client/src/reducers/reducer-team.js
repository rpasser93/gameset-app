import { FETCH_TEAM_BY_LOGIN, FETCH_TEAM_BY_ID } from "../actions/actions"

const teamReducer = (state = [], action) => {
  if( action && action.payload && action.payload.data) {
  }
  switch(action.type) {
    case FETCH_TEAM_BY_LOGIN:
      return [action.payload.data];

    case FETCH_TEAM_BY_ID:
      return [action.payload.data];
      
    default:
      return state;
  }
};

export default teamReducer;