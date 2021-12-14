import { combineReducers } from 'redux';
import teamReducer from './reducer-team';
import teamsReducer from './reducer-teams';
import playersReducer from './reducer-players';

const rootReducer = combineReducers({
  team: teamReducer,
  teams: teamsReducer,
  players: playersReducer
});

export default rootReducer;
