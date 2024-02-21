class Usuario{
    constructor(nombre, apellido, cedula, correo, role, estado,contrasena, horario_entrada, horario_salida, salario, telefono, foto, foto_Vehiculo) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.correo = correo;
      this.cedula = cedula;
      this.correo = correo;
      this.role = role;
      this.estado = estado;
      this.horario_entrada = horario_entrada;
      this.horario_salida = horario_salida;
      this.salario = salario;
      this.telefono = telefono;
      this.foto = foto;
      this.foto_Vehiculo = foto_Vehiculo;
      this.contrasena = contrasena; // encryptarla 
    }
  }
  
  export { Usuario };