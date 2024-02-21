
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
    const { email, newPassword } = req.body;

    try {
        // Validar los datos de entrada
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ error: 'El correo electrónico es requerido y debe ser una cadena de caracteres.' });
        }

        if (!newPassword || typeof newPassword !== 'string') {
            return res.status(400).json({ error: 'La nueva contraseña es requerida y debe ser una cadena de caracteres.' });
        }

        // Validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'El formato del correo electrónico no es válido.' });
        }
        
        // Validar la longitud de la nueva contraseña
        if (newPassword.length < 8) {
            return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 8 caracteres.' });
        }

        // Realizar la actualización de la contraseña
        await this.usuarioRepository.updateUserPasswordByEmail(email, newPassword);

        // Si todo está bien, enviar una respuesta exitosa
        res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar contraseña del usuario:', error);
        res.status(500).json({ error: 'Error al actualizar contraseña del usuario' });
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
    