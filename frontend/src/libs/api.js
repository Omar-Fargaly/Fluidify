import axios from 'axios';

// Create a custom instance
const api = axios.create({
  baseURL: `${process.env.API_URL}`,
});

export default api;
