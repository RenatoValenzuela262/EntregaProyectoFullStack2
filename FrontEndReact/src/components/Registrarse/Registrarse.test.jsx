import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
import Registrarse from "./Registrarse";

// Helper para renderizar con el router
const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("Registrarse.jsx", () => {
  test("Muestra el formulario de registro correctamente", () => {
    renderWithRouter(<Registrarse />);

    // Verificar que los campos principales del formulario estén presentes
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    // The component uses "Email" as label instead of "Correo Electrónico"
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    // Target the specific password input by its id to avoid matching the confirm field
    expect(
      screen.getByLabelText(/contraseña/i, { selector: "input#password-input" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    // Region / comuna use longer labels
    expect(screen.getByLabelText(/selecciona tu región/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/selecciona tu comuna/i)).toBeInTheDocument();
    // Phone label has an accent in the component
    expect(screen.getByLabelText(/télefono|telefono/i)).toBeInTheDocument();

    // Verificar que el botón de registro exista
    expect(
      screen.getByRole("button", { name: /registrarse/i })
    ).toBeInTheDocument();
  });
});
