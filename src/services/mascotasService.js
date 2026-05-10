import React from 'react'
import { apiClient } from './apiClient';

export const MascotasService = {
  
  getAll: async (ownerId = null, status = null) => {
    const params = {};
    if (ownerId) params.ownerId = ownerId;
    if (status) params.status = status;

    try {
      const response = await apiClient.get('/ms-mascotas/pets', { params });
      if (response.status === 204) return []; 
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener las mascotas');
    }
  },

  create: async (mascotaData) => {
    try {
      const response = await apiClient.post('/ms-mascotas/pets', mascotaData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar la mascota');
    }
  }
}