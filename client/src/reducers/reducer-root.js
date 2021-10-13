import { combineReducers } from 'redux';
import teamsReducer from './reducer-teams';


const rootReducer = combineReducers({
  teams: teamsReducer
});

export default rootReducer;
