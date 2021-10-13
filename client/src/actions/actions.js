import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/teams';

export const ADD_TEAM = "ADD_TEAM";
export const FETCH_TEAM_BY_LOGIN = "FETCH_TEAM_BY_LOGIN";

export const addTeam = (login, password, callback) => {
  const data = {
    login: login,
    password: password
  }

  const request = axios.post(baseUrl, data);

  request.then(() => callback())

  return {
    type: ADD_TEAM,
    payload: request
  };
}

export const fetchTeamByLogin = (login, password, callback) => {
  const data = {
    login: "kpauli",
    password: "simisimi"
  }

  const request = axios.post(`http://localhost:8000/api/team`, data);

  request.then(() => callback())

  return {
    type: FETCH_TEAM_BY_LOGIN,
    payload: request
  };

}