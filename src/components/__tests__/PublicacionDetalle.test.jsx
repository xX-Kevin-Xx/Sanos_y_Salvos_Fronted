import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PublicacionDetalle from '../PublicacionDetalle';
import { PublicacionService } from '../../services/publicacionService';

const routeMock = vi.hoisted(() => ({
  navigateMock: vi.fn(),
  params: { id: 'pub-1' },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => routeMock.navigateMock,
    useParams: () => routeMock.params,
  };
});

vi.mock('../../services/publicacionService', () => ({
  PublicacionService: {
    getDetalleCompleto: vi.fn(),
  },
}));

const detalle = {
  publicacion: {
    titulo: 'Luna perdida',
    tipoPublicacion: 'PERDIDA',
    fechaExtravioOEncuentro: '2026-05-01T12:00:00.000Z',
    direccionReferencia: 'Plaza norte',
    fechaPublicacion: '2026-05-02T12:00:00.000Z',
    descripcion: 'Tiene collar rojo',
    nombreContacto: 'Ana',
    telefonoContacto: '+56 9 1234 5678',
  },
  mascota: {
    name: 'Luna',
    species: 'Perro',
    color: 'Cafe',
    size: 15,
  },
};

describe('PublicacionDetalle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    routeMock.params = { id: 'pub-1' };
    PublicacionService.getDetalleCompleto.mockResolvedValue(detalle);
  });

  it('carga y muestra el detalle completo de una publicacion', async () => {
    render(<PublicacionDetalle />);

    expect(screen.getByText(/Cargando detalles/)).toBeInTheDocument();
    expect(await screen.findByText('Luna perdida')).toBeInTheDocument();
    expect(screen.getByText(/Nombre:/).parentElement).toHaveTextContent('Luna');
    expect(screen.getByText(/Tiene collar rojo/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contactar por WhatsApp/ })).toHaveAttribute(
      'href',
      'https://wa.me/56912345678',
    );
  });

  it('permite volver usando navigate(-1)', async () => {
    render(<PublicacionDetalle />);

    await screen.findByText('Luna perdida');
    fireEvent.click(screen.getByRole('button', { name: /Volver a la lista/ }));

    expect(routeMock.navigateMock).toHaveBeenCalledWith(-1);
  });

  it('muestra error cuando no puede cargar el detalle', async () => {
    PublicacionService.getDetalleCompleto.mockRejectedValue(new Error('No encontrado'));

    render(<PublicacionDetalle />);

    expect(await screen.findByText(/Error: No encontrado/)).toBeInTheDocument();
  });
});
