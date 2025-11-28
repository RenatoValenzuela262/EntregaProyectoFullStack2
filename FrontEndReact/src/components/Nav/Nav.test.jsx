import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import { CartProvider } from '../Productos/CartContext';
import { AuthProvider } from '../IniciarSesion/AuthContext';

const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          {ui}
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('Nav.jsx', () => {
  it('Muestra los links correctos para un usuario no autenticado', () => {
    renderWithProviders(<Nav />);

    expect(screen.getByRole('link', { name: /productos/i })).toHaveAttribute('href', '/Productos');
    expect(screen.getByRole('link', { name: /contactanos/i })).toHaveAttribute('href', '/Contactanos');
    expect(screen.getByRole('link', { name: /sobre nosotros/i })).toHaveAttribute('href', '/SobreNosotros');
    expect(screen.getByRole('link', { name: /iniciar sesion/i })).toHaveAttribute('href', '/IniciarSesion');
    expect(screen.getByRole('link', { name: /registrarse/i })).toHaveAttribute('href', '/Registrarse');
    expect(screen.queryByRole('button', { name: /cerrar sesión/i })).not.toBeInTheDocument();
  });

  it('navega a la página de Productos al hacer click en el link', async () => {
    const user = userEvent.setup();
    
    render(
        <MemoryRouter initialEntries={['/']}>
            <AuthProvider>
                <CartProvider>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<h1>Página Principal</h1>} />
                        <Route path="/Productos" element={<h1>Página de Productos</h1>} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /página principal/i })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /productos/i }));

    expect(await screen.findByRole('heading', { name: /página de productos/i })).toBeInTheDocument();
  });
});
