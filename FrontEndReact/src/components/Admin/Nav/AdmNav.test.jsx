import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdmNav from './AdmNav';
import { AuthProvider } from '../../IniciarSesion/AuthContext';

// Helper para renderizar con el provider de autenticación
const renderWithAuthProvider = (ui) => {
    return render(
        <MemoryRouter>
            <AuthProvider>
                {ui}
            </AuthProvider>
        </MemoryRouter>
    );
};

describe('AdmNav.jsx', () => {
    it('Muestra los links de navegación de administrador', () => {
        renderWithAuthProvider(<AdmNav />);

        expect(screen.getByRole('link', { name: /ordenes/i })).toHaveAttribute('href', '/Ordenes');
        expect(screen.getByRole('link', { name: /productos/i })).toHaveAttribute('href', '/AdmProductos');
        expect(screen.getByRole('link', { name: /usuarios/i })).toHaveAttribute('href', '/Usuarios');
        expect(screen.getByRole('link', { name: /cerrar sesión/i })).toBeInTheDocument();
    });

    it('navega a la página de productos de admin al hacer click en el link', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={['/']}>
                <AuthProvider>
                    <AdmNav />
                    <Routes>
                        <Route path="/" element={<h1>Página Principal Admin</h1>} />
                        <Route path="/AdmProductos" element={<h1>Página de Productos Admin</h1>} />
                    </Routes>
                </AuthProvider>
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: /página principal admin/i })).toBeInTheDocument();

        await user.click(screen.getByRole('link', { name: /productos/i }));

        expect(await screen.findByRole('heading', { name: /página de productos admin/i })).toBeInTheDocument();
    });
});
