
class Multa {
    constructor(id, cedula_usuario, matricula, placa, razon, fecha, monto) {
      this.id = id;
      this.cedula_usuario = cedula_usuario;
      this.matricula = matricula;
      this.placa = placa;
      this.razon = razon;
      this.fecha = new Date().toISOString();
      this.monto = monto;
    }
  }
  
  export { Multa };
  