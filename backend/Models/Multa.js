
class Multa {
    constructor(id, cedula_usuario, matricula,id_angente, placa, razon, fecha, monto) {
      this.id = id;
      this.cedula_usuario = cedula_usuario;
      this.matricula = matricula;
      this.placa = placa;
      this.razon = razon;
      this.fecha = new Date().toISOString();
      this.monto = monto;
      this.id_angente = id_angente;
    }
  }
  
  export { Multa };
  