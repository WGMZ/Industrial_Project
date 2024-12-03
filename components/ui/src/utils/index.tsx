import axios from 'axios';

export const UI_URL = 'http://localhost:3000';
export const API_URL = 'http://localhost:3001';

export const COPYRIGHT_STYLES = {
  parent: { display: 'none' },
  link: { display: 'none' },
  span: { display: 'none' },
};

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use((response) => response.data);
