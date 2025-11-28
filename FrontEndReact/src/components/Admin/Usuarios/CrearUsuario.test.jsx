import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import CrearUsuario from './CrearUsuario'

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('CrearUsuario.jsx', () => {
    const originalFetch  = global.fetch
    const originalConfirm = window.confirm
    const originalAlert = window.alert

    beforeEach(() => {
        global.fetch = vi.fn()
        window.confirm = vi.fn().mockReturnValue(true)
        window.alert = vi.fn()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    afterAll(() => {
        global.fetch = originalFetch
        window.confirm = originalConfirm
        window.alert = originalAlert
    })

    test('Carga y muestra usuarios correctamente', async () => {
        const mockData = [
            {nombreCompleto: "Prueba usuario 1", correo: "testusuario1@duocuc.cl", contrasenia: "testusuario1pass", confirmarContrasenia: "testusuario1pass", region: "metropolitana", comuna: "Santiago", telefono: "944448888", estado: true},
            {nombreCompleto: "Prueba usuario 2", correo: "testusuario2@gmail.com", contrasenia: "testusuario2pass", confirmarContrasenia: "testusuario2pass", region: "metropolitana", comuna: "Peñaflor", telefono: "988884444", estado: true},
            {nombreCompleto: "Prueba usuario 3", correo: "testusuario2@profe.duoc.cl", contrasenia: "testusuario3pass", confirmarContrasenia: "testusuario3pass", region: "metropolitana", comuna: "Maipu", telefono: "944884488", estado: true}
        ]

        global.fetch.mockResolvedValueOnce({
            pk: true,
            json: async () => mockData
        })
    })
})
