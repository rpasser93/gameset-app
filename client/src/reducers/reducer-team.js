import { FETCH_TEAM_BY_LOGIN, FETCH_TEAM_BY_ID, UPDATE_TEAM_NAME, UPDATE_PLAYER_MIN_SETTINGS, UPDATE_SEX_MIN_SETTINGS, UPDATE_INFIELD_MIN_SETTINGS, UPDATE_OUTFIELD_MIN_SETTINGS } from "../actions/actions"

const teamReducer = (state = [], action) => {
  if( action && action.payload && action.payload.data) {
  }
  switch(action.type) {

    case FETCH_TEAM_BY_LOGIN:
      return [action.payload.data];

    case FETCH_TEAM_BY_ID:
      return [action.payload.data];

    case UPDATE_TEAM_NAME:
      return state.map((team) => {
        if (team._id === action.payload.data.id) {
          team.teamName = action.payload.data.teamName;
          return team;
        } else {
          return team;
        }
      });

    case UPDATE_PLAYER_MIN_SETTINGS:
      return state.map((team) => {
        if (team._id === action.payload.data.id) {
          team.minPlayers = action.payload.data.minPlayers;
          return team;
        } else {
          return team;
        }
      });

    case UPDATE_SEX_MIN_SETTINGS:
      return state.map((team) => {
        if (team._id === action.payload.data.id) {
          team.settings[0].sexMin.min = action.payload.data.sexMin.min
          team.settings[0].sexMin.sex = action.payload.data.sexMin.sex;
          return team;
        } else {
          return team;
        }
      });

    case UPDATE_INFIELD_MIN_SETTINGS:
      return state.map((team) => {
        if (team._id === action.payload.data.id) {
          team.settings[0].infieldReq.min = action.payload.data.infieldReq.min
          team.settings[0].infieldReq.sex = action.payload.data.infieldReq.sex;
          return team;
        } else {
          return team;
        }
      });

      case UPDATE_OUTFIELD_MIN_SETTINGS:
      return state.map((team) => {
        if (team._id === action.payload.data.id) {
          team.settings[0].outfieldReq.min = action.payload.data.outfieldReq.min
          team.settings[0].outfieldReq.sex = action.payload.data.outfieldReq.sex;
          return team;
        } else {
          return team;
        }
      });

    default:
      return state;
  }
};

export default teamReducer;