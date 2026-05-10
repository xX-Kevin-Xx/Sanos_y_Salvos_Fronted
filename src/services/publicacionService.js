import { apiClient } from "./apiClient";

export const PublicacionService =  {
    getAll: async () => {
    try {
      const response = await apiClient.get('/ms-publicacion/publicaciones');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener publicaciones');
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/ms-publicacion/publicaciones/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener la publicación');
    }
  }
}