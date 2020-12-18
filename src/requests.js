import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/v1/';


const requestInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('auth_token')
      ? 'Token ' + localStorage.getItem('auth_token')
      : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});


export default requestInstance;