const API_URL = 'http://localhost:8082/api'; // Tu backend de geolocalización

export const geoService = {
  // Obtener todas las ubicaciones
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/ubicaciones`);
      if (!response.ok) {
        throw new Error('Error al obtener ubicaciones');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  // Obtener ubicación por ID
  async getById(id) {
    try {
      const response = await fetch(`${API_URL}/ubicaciones/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener ubicación');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getById:', error);
      throw error;
    }
  },

  // Obtener ubicaciones por estado (perdido/encontrado)
  async getByEstado(estado) {
    try {
      const response = await fetch(`${API_URL}/ubicaciones/estado/${estado}`);
      if (!response.ok) {
        throw new Error('Error al obtener ubicaciones por estado');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getByEstado:', error);
      throw error;
    }
  },

  // Obtener ubicaciones cercanas
  async getCercanas(lat, lng, radio = 5) {
    try {
      const response = await fetch(`${API_URL}/ubicaciones/cercanas?lat=${lat}&lng=${lng}&radio=${radio}`);
      if (!response.ok) {
        throw new Error('Error al obtener ubicaciones cercanas');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getCercanas:', error);
      throw error;
    }
  },

  // Crear nueva ubicación
  async create(ubicacion) {
    try {
      const response = await fetch(`${API_URL}/ubicaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ubicacion),
      });
      if (!response.ok) {
        throw new Error('Error al crear ubicación');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en create:', error);
      throw error;
    }
  },

  // Actualizar ubicación
  async update(id, ubicacion) {
    try {
      const response = await fetch(`${API_URL}/ubicaciones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ubicacion),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar ubicación');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en update:', error);
      throw error;
    }
  },

  // Eliminar ubicación
  async delete(id) {
    try {
      const response = await fetch(`${API_URL}/ubicaciones/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar ubicación');
      }
      return true;
    } catch (error) {
      console.error('Error en delete:', error);
      throw error;
    }
  },
};