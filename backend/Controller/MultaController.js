import { MultaRepository } from "../Repository/multa_repository.js";


class MultaController {
    constructor() {
        this.multaRepository = new MultaRepository();
    }

    async createMulta(req, res) {
      const { cedula_usuario, nombre_multado, matricula, placa, razon, monto, id_angente } = req.body;
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
  // En tu MultaController
  async getMultaByUser(req, res) {
    const { id_agente } = req.body;
    try {
        console.log('ID del agente en getMultaByUser:', id_agente);
        const multasDelAgente = await this.multaRepository.getMultaByIDAgent(id_agente);
        res.status(200).json({ message: 'Multas del agente obtenidas correctamente', multasDelAgente });
    } catch (error) {
        console.error('Error al buscar las multas:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener las multas del agente', details: error.message });
    }
}
async getAllMultas(req, res) {
    try {
       const multas = await this.multaRepository.getAllMultas();
       // Imprime los datos de los agentes en la consola
       console.log(multas);
       // Asegúrate de enviar la respuesta con el código de estado 200 y los datos de los agentes
       res.status(200).json(multas);
    } catch (error) {
       console.error(error);
       // Envía un mensaje de error con el código de estado 500
       res.status(500).json({ error: 'Error al obtener los multas' });
    }
   }
  };

export { MultaController };