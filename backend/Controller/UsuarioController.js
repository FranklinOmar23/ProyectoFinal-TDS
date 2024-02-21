
import { UsuarioRepository } from '../Repository/UsuarioRepository.js';  // Ajusta la ruta según tu estructura
import { generarContraseñaTemporal } from '../logic/genrarContraseña.js';
import bcrypt from 'bcryptjs';

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
  //obtener los datos del front
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

  async registerUser(req, res) {
    const {nombre, apellido, cedula, correo, telefono, contrasena, estado, horario_entrada, horario_salida, salario} = req.body;
    // console.log(nombre, apellido, cedula, correo, telefono, contrasena, estado, horario_entrada, horario_salida, salario)

    try {
      const existingUserByCedula = await this.usuarioRepository.getUserByCedula(cedula);
      if (existingUserByCedula) {
        return res.status(400).json({ message: "Ya existe un usuario con esta cédula" });
      }
      
      const existingUser = await this.usuarioRepository.getUserByEmail(correo); 

      if (existingUser) {
        return res.status(400).json({ message: "El correo electrónico ya está en uso" });
      }

      // if (contrasena !== confirmarContrasena) {
      //   return res.status(400).json({ message: "Las contraseñas" });
      // }

      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const newUser = await this.usuarioRepository.createUser ({
        nombre,
        apellido,
        cedula, 
        correo,
        estado,
        horario_entrada,
        horario_salida,
        salario,
        role: 'USUARIO',
        telefono,
        contrasena: hashedPassword
      });

      return res.status(201).json({message:`Usuario ${newUser.nombre} registrado correctamente`, user: newUser}); 
    } catch (error) {
      console.error(error);
      return res.status(500).json({message:"Error al registrar el usuario", error: error.message})
    }
  }
}
;
export { UsuarioController};
    