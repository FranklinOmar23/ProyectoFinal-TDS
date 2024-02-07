export function generarContraseñaTemporal(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: longitud }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join('');
  }
  
  // Ejemplo de uso con una longitud de 8 caracteres
  const contraseñaGenerada = generarContraseñaTemporal(8);
  console.log(contraseñaGenerada);
 