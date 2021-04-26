import React from "react";
import { render, screen } from "@testing-library/react";
import Formulario from "../components/Formulario";
import "@testing-library/jest-dom/extend-expect";  //para poder usar expect
import userEvent from "@testing-library/user-event";

const crearCita = jest.fn();

test("<Formulario/> Cargar el formulario y revisar que todo sea correcto", () => {
  //   const wrapper = render(<Formulario />); //montar el componente
  //   wrapper.debug(); //muestra el componente e informacion disponible

  render(<Formulario crearCita={crearCita} />);
  expect(screen.getByText("Crear Cita")).toBeInTheDocument();  //getByText equivale: document.querySelector

  // Headine
  const titulo = screen.getByTestId("titulo");
  expect(titulo.tagName).toBe("H2");
  expect(titulo.tagName).not.toBe("H1");
  expect(titulo.textContent).toBe("Crear Cita");

  //   Boton Submit
  expect(screen.getByTestId("btn-submit").tagName).toBe("BUTTON");
  expect(screen.getByTestId("btn-submit").textContent).toBe("Agregar Cita");
  expect(screen.getByTestId("btn-submit").textContent).not.toBe(
    "Agregar Nueva Cita"
  );
});

test("<Formulario/> Validación de fomrulario", () => {
  render(<Formulario crearCita={crearCita} />);

  //   Click en el boton de submit
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  //   Revisar por la alerta
  const alerta = screen.getByTestId("alerta");
  expect(alerta).toBeInTheDocument();
  expect(alerta.textContent).toBe("Todos los campos son obligatorios");
  expect(alerta.tagName).toBe("P");
  expect(alerta.tagName).not.toBe("BUTTON");
});

test("<Formulario/> Validación de fomrulario", () => {
  render(<Formulario crearCita={crearCita} />);

  userEvent.type(screen.getByTestId("mascota"), "Hook");
  userEvent.type(screen.getByTestId("propietario"), "Robert");
  userEvent.type(screen.getByTestId("fecha"), "2021-09-10");
  userEvent.type(screen.getByTestId("hora"), "10:30");
  userEvent.type(screen.getByTestId("sintomas"), "Solo duerme");

  //   Click en el boton de submit
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  //   Revisar por la alerta
  const alerta = screen.queryByTestId("alerta");
  expect(alerta).not.toBeInTheDocument();

  //   Crear cita y comprobar que la funcion de haya llamado
  expect(crearCita).toHaveBeenCalled();
  expect(crearCita).toHaveBeenCalledTimes(1);
});
