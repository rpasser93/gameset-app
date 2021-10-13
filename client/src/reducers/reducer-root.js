import { combineReducers } from 'redux';
import teamReducer from './reducer-team';
import teamsReducer from './reducer-teams';

const rootReducer = combineReducers({
  team: teamReducer,
  teams: teamsReducer
});

export default rootReducer;
