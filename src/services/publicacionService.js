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
  },

  getDetalleCompleto: async (id) => {
    try {
      const response = await apiClient.get(`/bff/orquestador/publicaciones/${id}/detalle`);
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener el detalle completo');
    }
  },

  crearReporteOrquestado: async (payload) => {
    try {
      const response = await apiClient.post('/bff/orquestador/publicaciones/completo', payload);
      return response.data;
    } catch (error) {
      const mensajeBackend = error.response?.data;
      const mensajeLog = typeof mensajeBackend === 'string' ? mensajeBackend : mensajeBackend?.message;
      
      throw new Error(mensajeLog || 'Error al crear el reporte orquestado');
    }
  }
}