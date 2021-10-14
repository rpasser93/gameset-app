import axios from 'axios';
const baseUrl = 'http://localhost:8000/api/teams';

export const ADD_TEAM = "ADD_TEAM";
export const FETCH_TEAM_BY_LOGIN = "FETCH_TEAM_BY_LOGIN";
export const FETCH_TEAM_BY_ID = "FETCH_TEAM_BY_ID";
export const FETCH_PLAYERS = "FETCH_PLAYERS";
export const UPDATE_PLAYER_AVAILABILITY = "UPDATE_PLAYER_AVAILABILITY";

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

export const fetchTeamByLogin = (login, password) => {
  const data = {
    login: 'kpauli',
    password: 'simisimi'
  }

  const request = axios.post(`http://localhost:8000/api/team`, data);

  return {
    type: FETCH_TEAM_BY_LOGIN,
    payload: request
  };

}

export const fetchTeamById = (id) => {

  const request = axios.get(`http://localhost:8000/api/teams/${id}`);

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