
import { UsuarioRepository } from '../Repository/UsuarioRepository.js';  // Ajusta la ruta según tu estructura

class UsuarioController {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }
  

  async getAllUsers(req, res) {
    
    try {
      const usuarios = await this.usuarioRepository.getAllUsers();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error obteniendo usuarios');
    }
  }  
}
;
export { UsuarioController };
