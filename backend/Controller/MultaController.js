import { MultaRepository } from "../Repository/multa_repository.js";

class MultaController {
    constructor() {
        this.multaRepository = new MultaRepository();
    }

    async createMulta(req, res) {
      const { cedula_usuario, nombre_multado, matricula, placa, razon, monto } = req.body;
      const fecha = new Date(); // Obtener la fecha actual
      const multaData = { cedula_usuario, nombre_multado, matricula, placa, razon, fecha, monto };

      try {
          const multa = await this.multaRepository.createMulta(multaData);
          res.status(201).json({ message: 'Multa creada exitosamente', multa });
      } catch (error) {
          console.error('Error al crear la multa:', error);
          res.status(500).json({ error: 'Error al crear la multa' });
      }
  }

}

export { MultaController };