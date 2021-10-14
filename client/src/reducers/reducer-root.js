import { combineReducers } from 'redux';
import teamReducer from './reducer-team';
import teamsReducer from './reducer-teams';
import playerReducer from './reducer-player';
import playersReducer from './reducer-players';

const rootReducer = combineReducers({
  team: teamReducer,
  teams: teamsReducer,
  player: playerReducer,
  players: playersReducer
});

export default rootReducer;
