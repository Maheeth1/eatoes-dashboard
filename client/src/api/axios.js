import axios from 'axios';

// Change this URL when deploying to Render
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
});

export default API;