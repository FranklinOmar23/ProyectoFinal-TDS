import { MultaRepository } from "../Repository/multa_repository";

class MultaController {
    constructor() {
        this.MultaRepository = new MultaRepository();
    }
    async createMulta(req, res) {
        const multaData = req.body; // Asumiendo que los datos de la multa están en el cuerpo de la solicitud
        try {
            const nuevaMulta = await multaRepository.createMulta(multaData);
            res.status(201).json(nuevaMulta);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la multa', error: error.message });
        }
    }

}