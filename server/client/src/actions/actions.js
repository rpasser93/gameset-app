import axios from 'axios';
const baseUrl = '/api/teams';

export const FETCH_TEAMS = "FETCH_TEAMS";
export const ADD_TEAM = "ADD_TEAM";
export const DELETE_TEAM = "DELETE_TEAM";
export const FETCH_TEAM_BY_LOGIN = "FETCH_TEAM_BY_LOGIN";
export const FETCH_TEAM_BY_ID = "FETCH_TEAM_BY_ID";
export const UPDATE_TEAM_NAME = "UPDATE_TEAM_NAME";
export const UPDATE_TEAM_PASSWORD = "UPDATE_TEAM_PASSWORD";
export const UPDATE_PLAYER_MIN_SETTINGS = "UPDATE_PLAYER_MIN_SETTINGS";
export const UPDATE_SEX_MIN_SETTINGS = "UPDATE_SEX_MIN_SETTINGS";
export const UPDATE_INFIELD_MIN_SETTINGS = "UPDATE_INFIELD_MIN_SETTINGS";
export const UPDATE_OUTFIELD_MIN_SETTINGS = "UPDATE_OUTFIELD_MIN_SETTINGS";
export const UPDATE_BATTING_REQ_SETTINGS = "UPDATE_BATTING_REQ_SETTINGS";

export const FETCH_PLAYERS = "FETCH_PLAYERS";
export const UPDATE_PLAYER_AVAILABILITY = "UPDATE_PLAYER_AVAILABILITY";
export const UPDATE_PLAYER_LINEUP = "UPDATE_PLAYER_LINEUP";
export const UPDATE_PLAYER_BATTING_ORDER = "UPDATE_PLAYER_BATTING_ORDER";
export const UPDATE_PLAYER_BATTING_ROTATION = "UPDATE_PLAYER_BATTING_ROTATION";
export const ADD_PLAYER = "ADD_PLAYER";
export const DELETE_PLAYER = "DELETE_PLAYER";
export const UPDATE_PLAYER_FIRSTNAME = "UPDATE_PLAYER_FIRSTNAME";
export const UPDATE_PLAYER_LASTNAME = "UPDATE_PLAYER_LASTNAME";
export const UPDATE_PLAYER_SEX = "UPDATE_PLAYER_SEX";

export const fetchTeams = () => {
  const request = axios.get(baseUrl);

  return {
    type: FETCH_TEAMS,
    payload: request
  };
}

export const addTeam = (login, password) => {
  const data = {
    login: login,
    password: password
  }

  const request = axios.post(baseUrl, data);

  return {
    type: ADD_TEAM,
    payload: request
  };
}

export const deleteTeam = (id) => {

  const request = axios.delete(`/api/teams/${id}`);

  return {
    type: DELETE_TEAM,
    payload: request
  };
}

export const fetchTeamByLogin = (login, password) => {
  const data = {
    login: login,
    password: password
  }

  const request = axios.post(`/api/team`, data);

  return {
    type: FETCH_TEAM_BY_LOGIN,
    payload: request
  };
}

export const fetchTeamById = (id) => {

  const request = axios.get(`/api/teams/${id}`);

  return {
    type: FETCH_TEAM_BY_ID,
    payload: request
  };
}

export const fetchPlayers = (id, query, callback) => {

  const request = axios.get(`${baseUrl}/${id}/players/?sort=${query}`);

  if (callback) {
    request.then(() => callback());
  }

  return {
    type: FETCH_PLAYERS,
    payload: request
  };
}

export const updatePlayerAvailability = (teamId, playerId) => {

  const request = axios.put(`${baseUrl}/${teamId}/players/${playerId}/availability`);

  return {
    type: UPDATE_PLAYER_AVAILABILITY,
    payload: request
  };
}

export const updatePlayerLineup = (teamId, playerId, position, arrayNumber) => {
  const data = {
    position: position,
    arrayNumber: arrayNumber
  }

  const request = axios.put(`${baseUrl}/${teamId}/players/${playerId}/lineup`, data);

  return {
    type: UPDATE_PLAYER_LINEUP,
    payload: request
  };
}

export const updatePlayerFirstName = (teamId, playerId, firstName) => {
  const data = {
    firstName: firstName
  }

  const request = axios.put(`${baseUrl}/${teamId}/players/${playerId}/firstName`, data);

  return {
    type: UPDATE_PLAYER_FIRSTNAME,
    payload: request
  };
}

export const updatePlayerLastName = (teamId, playerId, lastName) => {
  const data = {
    lastName: lastName
  }

  const request = axios.put(`${baseUrl}/${teamId}/players/${playerId}/lastName`, data);

  return {
    type: UPDATE_PLAYER_LASTNAME,
    payload: request
  };
}

export const updatePlayerSex = (teamId, playerId, sex) => {
  const data = {
    sex: sex
  }

  const request = axios.put(`${baseUrl}/${teamId}/players/${playerId}/sex`, data);

  return {
    type: UPDATE_PLAYER_SEX,
    payload: request
  };
}

export const updatePlayerBattingOrder = (teamId, playerId, battingOrder) => {
  const data = {
    battingOrder: battingOrder
  }

  const request = axios.put(`${baseUrl}/${teamId}/players/${playerId}/battingOrder`, data);

  return {
    type: UPDATE_PLAYER_BATTING_ORDER,
    payload: request
  };
}

export const updatePlayerBattingRotation = (teamId, playerId, battingRotateWith) => {
  const data = {
    battingRotateWith: battingRotateWith
  }

  const request = axios.put(`${baseUrl}/${teamId}/players/${playerId}/battingRotateWith`, data);

  return {
    type: UPDATE_PLAYER_BATTING_ROTATION,
    payload: request
  };
}

export const addPlayer = (teamId, firstName, lastName, sex) => {
  const data = {
    firstName: firstName,
    lastName: lastName,
    sex: sex
  }

  const request = axios.post(`${baseUrl}/${teamId}/players`, data);

  return {
    type: ADD_PLAYER,
    payload: request
  };
}

export const deletePlayer = (teamId, playerId) => {

  const request = axios.delete(`${baseUrl}/${teamId}/players/${playerId}`);

  return {
    type: DELETE_PLAYER,
    payload: request
  };
}

export const updateTeamName = (teamId, teamName) => {
  const data = {
    teamName: teamName
  }

  const request = axios.put(`${baseUrl}/${teamId}`, data);

  return {
    type: UPDATE_TEAM_NAME,
    payload: request
  };
}

export const updateTeamPassword = (teamId, password) => {
  const data = {
    password: password
  }

  const request = axios.put(`${baseUrl}/${teamId}/login`, data);

  return {
    type: UPDATE_TEAM_PASSWORD,
    payload: request
  };
}

export const updatePlayerMinSettings = (teamId, minPlayers) => {
  const data = {
    minPlayers: minPlayers
  }

  const request = axios.put(`${baseUrl}/${teamId}/settings/minPlayers`, data);

  return {
    type: UPDATE_PLAYER_MIN_SETTINGS,
    payload: request
  };
}

export const updateSexMinSettings = (teamId, sex, min) => {
  const data = {
    sex: sex,
    min: min
  }

  const request = axios.put(`${baseUrl}/${teamId}/settings/sexMin`, data);

  return {
    type: UPDATE_SEX_MIN_SETTINGS,
    payload: request
  };
}

export const updateInfieldMinSettings = (teamId, sex, min) => {
  const data = {
    sex: sex,
    min: min
  }

  const request = axios.put(`${baseUrl}/${teamId}/settings/infieldReq`, data);

  return {
    type: UPDATE_INFIELD_MIN_SETTINGS,
    payload: request
  };
}

export const updateOutfieldMinSettings = (teamId, sex, min) => {
  const data = {
    sex: sex,
    min: min
  }

  const request = axios.put(`${baseUrl}/${teamId}/settings/outfieldReq`, data);

  return {
    type: UPDATE_OUTFIELD_MIN_SETTINGS,
    payload: request
  };
}

export const updateBattingReqSettings = (teamId, sex, min) => {
  const data = {
    sex: sex,
    min: min
  }

  const request = axios.put(`${baseUrl}/${teamId}/settings/battingReq`, data);

  return {
    type: UPDATE_BATTING_REQ_SETTINGS,
    payload: request
  };
}