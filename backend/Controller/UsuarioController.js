
import { UsuarioRepository } from '../Repository/UsuarioRepository.js';  // Ajusta la ruta según tu estructura
import { generarContraseñaTemporal } from '../logic/genrarContraseña.js';

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
    const userId = req.params.id; 
    const nuevaContraseña = generarContraseñaTemporal(8); 

    try {
      await this.usuarioRepository.updateUserPassword(userId, nuevaContraseña);

      res.json({ mensaje: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error actualizando contraseña del usuario');
    }
  }
  //optener los datos del front
  async login(req, res) {
    const { cedula, contrasena } = req.body;

    try {
      const user = await this.usuarioRepository.loginUser(cedula, contrasena);
      res.json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
      console.error(error);
      res.status(401).send('Credenciales inválidas');
    }
  }
}
;
export { UsuarioController};
    