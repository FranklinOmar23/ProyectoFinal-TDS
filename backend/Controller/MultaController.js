import { MultaRepository } from "../Repository/multa_repository.js";

class MultaController {
    constructor() {
        this.multaRepository = new MultaRepository();
    }

    async createMulta(req, res) {
      const { cedula_usuario, nombre_multado, matricula, placa, razon, monto,id_angente } = req.body;
      const fecha = new Date(); // Obtener la fecha actual
      const multaData = { cedula_usuario, nombre_multado, matricula, placa, razon, fecha, monto,id_angente };

      try {
          const multa = await this.multaRepository.createMulta(multaData);
          res.status(201).json({ message: 'Multa creada exitosamente', multa });
      } catch (error) {
          console.error('Error al crear la multa:', error);
          res.status(500).json({ error: 'Error al crear la multa' });
      }
  }
  async getMultaByUser(req, res) {
    const id_angente ='136'
    try {
        const multasDelAgente = await this.multaRepository.getMultaByIDAgent(id_angente);
        res.status(201).json({ message: 'Multas del Agente: ', multasDelAgente });
    } catch (error) {
        console.error('Error al buscar las multas:', error);
        res.status(500).json({ error: 'Error al buscar las multa' });
        
    }
   
  }

}

export { MultaController };