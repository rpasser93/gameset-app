import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/teams';

export const ADD_TEAM = "ADD_TEAM";

export const addTeam = (login, password, callback) => {
  const data = {
    login: login,
    password: password
  }

  const request = axios.post(baseUrl, data);

  request.then(() => callback())
  .catch(error => {
    console.log(error);
  })

  return {
    type: ADD_TEAM,
    payload: request
  };
}