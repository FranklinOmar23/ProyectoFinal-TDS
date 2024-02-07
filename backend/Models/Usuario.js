class Usuario{
    constructor(id, nombre, apellido, cedula, role, estado,contrasena, horario_entrada,horario_salida, salario, telefono, photo, photo_Vehiculo) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.cedula = cedula;
      this.role = role;
      this.estado = estado;
      this.horario_entrada = horario_entrada;
      this.horario_salida = horario_salida;
      this.salario = salario;
      this.telefono = telefono;
      this.photo = photo;
      this.photo_Vehiculo = photo_Vehiculo;
      this.contrasena =contrasena; // encryptarla 
    }
  }
  
  export { Usuario };