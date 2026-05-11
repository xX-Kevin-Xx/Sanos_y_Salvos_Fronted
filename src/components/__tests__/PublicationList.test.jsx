import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PublicationList from '../PublicationList';
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
    getAll: vi.fn(),
  },
}));

const publicaciones = [
  {
    idPublicacion: 'pub-1',
    titulo: 'Luna perdida',
    tipoPublicacion: 'PERDIDA',
    direccionReferencia: 'Plaza norte',
    descripcion: 'Collar rojo',
    nombreContacto: 'Ana',
    telefonoContacto: '+56911111111',
    fechaPublicacion: '2026-05-01T12:00:00.000Z',
  },
  {
    idPublicacion: 'pub-2',
    titulo: 'Michi encontrado',
    tipoPublicacion: 'ENCONTRADA',
    direccionReferencia: 'Parque central',
    descripcion: 'Muy tranquilo',
    nombreContacto: 'Luis',
    telefonoContacto: '+56922222222',
    fechaPublicacion: '2026-05-02T12:00:00.000Z',
  },
];

describe('PublicationList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    PublicacionService.getAll.mockResolvedValue(publicaciones);
  });

  it('muestra publicaciones obtenidas desde el servicio', async () => {
    render(<PublicationList />);

    expect(screen.getByText(/Cargando publicaciones/)).toBeInTheDocument();
    expect(await screen.findByText('Luna perdida')).toBeInTheDocument();
    expect(screen.getByText('Michi encontrado')).toBeInTheDocument();
  });

  it('filtra por texto de busqueda', async () => {
    const { container } = render(<PublicationList />);

    await screen.findByText('Luna perdida');
    fireEvent.change(container.querySelector('.mascota-search input'), {
      target: { value: 'parque' },
    });

    expect(screen.queryByText('Luna perdida')).not.toBeInTheDocument();
    expect(screen.getByText('Michi encontrado')).toBeInTheDocument();
  });

  it('filtra publicaciones encontradas y navega al detalle', async () => {
    render(<PublicationList />);

    await screen.findByText('Luna perdida');
    fireEvent.click(screen.getByRole('button', { name: /Encontrados/ }));

    expect(screen.queryByText('Luna perdida')).not.toBeInTheDocument();
    expect(screen.getByText('Michi encontrado')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Ver m.*s detalles/i }));

    expect(navigateMock).toHaveBeenCalledWith('/publicaciones/pub-2');
  });

  it('muestra mensaje de error cuando el servicio falla', async () => {
    PublicacionService.getAll.mockRejectedValue(new Error('Servicio no disponible'));

    render(<PublicationList />);

    await waitFor(() => {
      expect(screen.getByText('Error: Servicio no disponible')).toBeInTheDocument();
    });
  });
});
