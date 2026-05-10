import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8085', 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});