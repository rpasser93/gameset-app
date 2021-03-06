import { FETCH_PLAYERS, ADD_PLAYER, DELETE_PLAYER, UPDATE_PLAYER_FIRSTNAME, UPDATE_PLAYER_LASTNAME, UPDATE_PLAYER_SEX, UPDATE_PLAYER_AVAILABILITY, UPDATE_PLAYER_LINEUP, UPDATE_PLAYER_BATTING_ORDER, UPDATE_PLAYER_BATTING_ROTATION } from "../actions/actions"

const playersReducer = (state = [], action) => {
  switch(action.type) {
    
    case FETCH_PLAYERS:
      return action.payload.data;

    case ADD_PLAYER:
      return [...state, action.payload.data];

    case DELETE_PLAYER:
     return state.filter((player) => {
       return player._id !== action.payload.data;
     });

     case UPDATE_PLAYER_FIRSTNAME:
      return state.map((player) => {
        if (player._id === action.payload.data.id) {
          player.firstName = action.payload.data.firstName;
          return player;
        } else {
          return player;
        }
      });

    case UPDATE_PLAYER_LASTNAME:
      return state.map((player) => {
        if (player._id === action.payload.data.id) {
          player.lastName = action.payload.data.lastName;
          return player;
        } else {
          return player;
        }
      });

    case UPDATE_PLAYER_SEX:
      return state.map((player) => {
        if (player._id === action.payload.data.id) {
          player.sex = action.payload.data.sex;
          return player;
        } else {
          return player;
        }
      });

    case UPDATE_PLAYER_AVAILABILITY:
      return state.map((player) => {
        if (player._id === action.payload.data) {
          player.availability = !player.availability;
          return player;
        } else {
          return player;
        }
      });

    case UPDATE_PLAYER_LINEUP:
      return state.map((player) => {
        if (player._id === action.payload.data.id) {
          player.lineup[action.payload.data.arrayNum] = action.payload.data.pos;
          return player;
        } else {
          return player;
        }
      });

    case UPDATE_PLAYER_BATTING_ORDER:
      return state.map((player) => {
        if (player._id === action.payload.data.id) {
          player.battingOrder = action.payload.data.battingOrder;
          return player;
        } else {
          return player;
        }
      });

    case UPDATE_PLAYER_BATTING_ROTATION:
      return state.map((player) => {
        if (player._id === action.payload.data.id) {
          player.battingRotateWith = action.payload.data.battingRotateWith;
          return player;
        } else {
          return player;
        }
      });
      
    default:
      return state;
  }
};

export default playersReducer;