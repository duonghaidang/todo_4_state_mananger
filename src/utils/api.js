import axios from 'axios';

let API = axios.create({
  baseURL: 'https://kpopvote.com:5556/api/v1/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
export default API;
