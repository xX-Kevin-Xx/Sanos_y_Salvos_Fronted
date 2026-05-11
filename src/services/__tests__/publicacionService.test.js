import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PublicacionService } from '../publicacionService';
import { apiClient } from '../apiClient';

vi.mock('../apiClient', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('PublicacionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('obtiene todas las publicaciones desde el endpoint esperado', async () => {
    const publicaciones = [{ idPublicacion: 'pub-1', titulo: 'Luna perdida' }];
    apiClient.get.mockResolvedValue({ data: publicaciones });

    await expect(PublicacionService.getAll()).resolves.toEqual(publicaciones);
    expect(apiClient.get).toHaveBeenCalledWith('/ms-publicacion/publicaciones');
  });

  it('obtiene el detalle completo por id', async () => {
    const detalle = { publicacion: { idPublicacion: 'pub-1' }, mascota: { name: 'Luna' } };
    apiClient.get.mockResolvedValue({ data: detalle });

    await expect(PublicacionService.getDetalleCompleto('pub-1')).resolves.toEqual(detalle);
    expect(apiClient.get).toHaveBeenCalledWith('/bff/orquestador/publicaciones/pub-1/detalle');
  });

  it('obtiene una publicacion por id', async () => {
    const publicacion = { idPublicacion: 'pub-1', titulo: 'Luna perdida' };
    apiClient.get.mockResolvedValue({ data: publicacion });

    await expect(PublicacionService.getById('pub-1')).resolves.toEqual(publicacion);
    expect(apiClient.get).toHaveBeenCalledWith('/ms-publicacion/publicaciones/pub-1');
  });

  it('crea un reporte orquestado con el payload recibido', async () => {
    const payload = { titulo: 'Encontramos a Sol' };
    const response = { idPublicacion: 'pub-2' };
    apiClient.post.mockResolvedValue({ data: response });

    await expect(PublicacionService.crearReporteOrquestado(payload)).resolves.toEqual(response);
    expect(apiClient.post).toHaveBeenCalledWith('/bff/orquestador/publicaciones/completo', payload);
  });

  it('usa mensajes string del backend al fallar la creacion orquestada', async () => {
    apiClient.post.mockRejectedValue({ response: { data: 'Telefono invalido' } });

    await expect(PublicacionService.crearReporteOrquestado({})).rejects.toThrow('Telefono invalido');
  });
});
