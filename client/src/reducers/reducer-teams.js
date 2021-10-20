import { FETCH_TEAMS, ADD_TEAM, DELETE_TEAM } from "../actions/actions"

const teamsReducer = (state = [], action) => {
  console.log('state', state);
  console.log('action', action);
  switch(action.type) {

    case FETCH_TEAMS:
      return action.payload.data

    case ADD_TEAM:
      return [...state, action.payload.data]

    case DELETE_TEAM:
      return state;
      
    default:
      return state;
  }
};

export default teamsReducer;