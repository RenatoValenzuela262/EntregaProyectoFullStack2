import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import CrearProducto from './CrearProducto'

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('CrearProducto.jsx', () => {
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

    test('Carga y muestra productos correctamente', async () => {
        const mockData = [
            {nombre: "Cucurucho", categoria: "Galleta", descripcion: "Galleta en forma de cono para hacer helados artesanales o de maquina", precio: 2800, stock: 45, imagen: "https://i.pinimg.com/736x/fe/2d/68/fe2d68a30b3b53b227f1f9c384c0e32b.jpg"},
            {nombre: "Macaron", categoria: "Bizcocho", descripcion: "Bizcochos de colores con distintas texturas y sabores", precio: 3200, stock: 15, imagen: "https://i.pinimg.com/736x/c2/bb/1d/c2bb1dd2e0bd020a47b007c6c84cce7a.jpg"}
        ]

        global.fetch.mockResolvedValueOnce({
            pk: true,
            json: async () => mockData
        })
    })
})
