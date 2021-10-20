import { FETCH_TEAMS, ADD_TEAM } from "../actions/actions"

const teamsReducer = (state = [], action) => {
  switch(action.type) {

    case FETCH_TEAMS:
      return action.payload.data

    case ADD_TEAM:
      return [...state, action.payload.data]
      
    default:
      return state;
  }
};

export default teamsReducer;