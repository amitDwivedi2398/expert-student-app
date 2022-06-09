import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://65.0.80.5:5000/api/admin',
});

export default instance;
