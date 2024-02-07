
import { UsuarioRepository } from '../Repository/UsuarioRepository.js';  // Ajusta la ruta según tu estructura
import  {generarContraseñaTemporal} from '../logic/genrarContraseña.js'

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
  async updateUserByNewPassword(req, res) {
    const userId = req.params.userId; // Asegúrate de tener la ruta adecuada con el ID del usuario
    const nuevaContraseña = generarContraseñaTemporal(8); // Cambia la longitud según tus necesidades

    try {
      // Llama a la función en tu repositorio para actualizar la contraseña del usuario
      await this.usuarioRepository.updateUserPassword(userId, nuevaContraseña);

      res.json({ mensaje: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error actualizando contraseña del usuario');
    }
  }
}
;
export { UsuarioController,nuevaContraseña};
