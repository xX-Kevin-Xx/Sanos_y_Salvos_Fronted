import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MascotaForm from '../MascotaForm';
import { PublicacionService } from '../../services/publicacionService';

const { navigateMock } = vi.hoisted(() => ({
  navigateMock: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../../services/publicacionService', () => ({
  PublicacionService: {
    crearReporteOrquestado: vi.fn(),
  },
}));

describe('MascotaForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    vi.clearAllMocks();
    PublicacionService.crearReporteOrquestado.mockResolvedValue({ idPublicacion: 'pub-1' });
  });

  it('envia el payload orquestado y redirige al publicar', async () => {
    const { container } = render(<MascotaForm />);

    fireEvent.change(container.querySelector('input[name="titulo"]'), { target: { value: 'Busco a Luna' } });
    fireEvent.change(container.querySelector('input[name="nombre"]'), { target: { value: 'Luna' } });
    fireEvent.change(container.querySelector('input[name="color"]'), { target: { value: 'Blanco' } });
    fireEvent.change(container.querySelector('select[name="tamaño"]'), { target: { value: 'grande' } });
    fireEvent.change(container.querySelector('input[name="ubicacion"]'), { target: { value: 'Valparaiso' } });
    fireEvent.change(container.querySelector('textarea[name="descripcion"]'), { target: { value: 'Tiene collar azul' } });
    fireEvent.change(container.querySelector('input[name="nombreContacto"]'), { target: { value: 'Carla' } });
    fireEvent.change(container.querySelector('input[name="telefonoContacto"]'), { target: { value: '+56912345678' } });

    fireEvent.click(screen.getByRole('button', { name: /Publicar Reporte/ }));

    await waitFor(() => {
      expect(PublicacionService.crearReporteOrquestado).toHaveBeenCalledWith(
        expect.objectContaining({
          titulo: 'Busco a Luna',
          nombre: 'Luna',
          color: 'Blanco',
          ubicacion: 'Valparaiso',
          descripcion: 'Tiene collar azul',
          nombreContacto: 'Carla',
          telefonoContacto: '+56912345678',
          tamaño: 30,
          latitud: -33.68,
          longitud: -71.21,
        }),
      );
    });

    expect(screen.getByText(/Reporte publicado exitosamente/)).toBeInTheDocument();
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/publicaciones');
    }, { timeout: 3000 });
  });

  it('muestra error cuando falla la creacion del reporte', async () => {
    PublicacionService.crearReporteOrquestado.mockRejectedValue(new Error('Backend caido'));
    const { container } = render(<MascotaForm />);

    fireEvent.change(container.querySelector('input[name="titulo"]'), { target: { value: 'Busco a Luna' } });
    fireEvent.change(container.querySelector('input[name="nombre"]'), { target: { value: 'Luna' } });
    fireEvent.change(container.querySelector('input[name="ubicacion"]'), { target: { value: 'Valparaiso' } });
    fireEvent.change(container.querySelector('input[name="nombreContacto"]'), { target: { value: 'Carla' } });
    fireEvent.change(container.querySelector('input[name="telefonoContacto"]'), { target: { value: '+56912345678' } });

    fireEvent.click(screen.getByRole('button', { name: /Publicar Reporte/ }));

    expect(await screen.findByText(/Error al guardar: Backend caido/)).toBeInTheDocument();
  });
});
