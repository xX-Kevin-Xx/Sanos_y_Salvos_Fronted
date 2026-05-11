import { describe, expect, it, vi, beforeEach } from 'vitest';
import { MascotasService } from '../mascotasService';
import { apiClient } from '../apiClient';

vi.mock('../apiClient', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('MascotasService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('obtiene mascotas con filtros opcionales', async () => {
    const mascotas = [{ id: 'pet-1', name: 'Luna' }];
    apiClient.get.mockResolvedValue({ status: 200, data: mascotas });

    const result = await MascotasService.getAll('owner-1', 'LOST');

    expect(apiClient.get).toHaveBeenCalledWith('/ms-mascotas/pets', {
      params: { ownerId: 'owner-1', status: 'LOST' },
    });
    expect(result).toEqual(mascotas);
  });

  it('retorna un arreglo vacio cuando el backend responde 204', async () => {
    apiClient.get.mockResolvedValue({ status: 204 });

    await expect(MascotasService.getAll()).resolves.toEqual([]);
  });

  it('propaga el mensaje del backend al fallar la creacion', async () => {
    apiClient.post.mockRejectedValue({
      response: { data: { message: 'Nombre requerido' } },
    });

    await expect(MascotasService.create({ name: '' })).rejects.toThrow('Nombre requerido');
  });
});
