import axios from 'axios';

const api = axios.create({
  baseURL: 'https://softplan-api.vercel.app',
});

export default api;
