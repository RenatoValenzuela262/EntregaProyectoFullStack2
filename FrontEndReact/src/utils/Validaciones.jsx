function validarCorreo(correo) {
  const dominiosPermitidos = ["@duocuc.cl", "@profesor.duoc.cl", "@gmail.com"];
  return dominiosPermitidos.some((dominio) =>
    correo.toLowerCase().endsWith(dominio)
  );
}

export default validarCorreo;
