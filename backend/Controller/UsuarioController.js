
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
        console.log("Cédula recibida:", cedula);
        console.log("Contraseña recibida:", contrasena);

        const user = await this.usuarioRepository.loginUser(cedula, contrasena);
        console.log("Usuario encontrado en la base de datos:", user);

        res.json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(401).send('Credenciales inválidas');
    }
}

  async registerUser(req, res) {
    const {nombre, apellido, cedula, correo, telefono, contrasena, estado, horario_entrada, horario_salida, salario} = req.body;

    try {

      const existingUserByCedula = await this.usuarioRepository.getUserByCedula(cedula);
      if (existingUserByCedula) {
        return res.status(400).json({ message: "Ya existe un usuario con esta cédula." });
      }
      
      const existingUser = await this.usuarioRepository.getUserByEmail(correo); 
      if (existingUser) {
        return res.status(400).json({ message: "El correo electrónico ya está en uso." });
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

  async getUserNameByCedula(req, res) {
    const { cedula } = req.body;

    try {
      // Validar que la cédula no esté vacía
      if (!cedula || typeof cedula !== 'string') {
        return res.status(400).json({ error: 'La cédula es requerida y debe ser una cadena de caracteres.' });
      }

      // Obtener el nombre del usuario por su cédula
      const nombre = await this.usuarioRepository.getUserNameByCedula(cedula);

      // Enviar el nombre del usuario al frontend
      res.json({ nombre });
    } catch (error) {
      console.error('Error al obtener el nombre del usuario:', error);
      res.status(500).json({ error: 'Error al obtener el nombre del usuario' });
    }
  }

  async updateUser(req, res) {
    const userId = req.params.id; // Obtener el ID del usuario de la solicitud
    const {telefono, contrasena} = req.body; // Obtener los datos actualizados del cuerpo de la solicitud
  
    try {

      const currentUser = await this.usuarioRepository.getUserById(userId);
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const updatedUserData = {
        telefono,
        contrasena: hashedPassword
      }

      await this.usuarioRepository.updateUser({id: userId, ...updatedUserData});
  
      res.status(200).json({ message: 'Los datos fueron actualizados exitosamente!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Se produjo un error al actualizar los datos del usuario' });
    }

  }

  async uploadImage (req, res) {
    const { foto, foto_Vehiculo } = req.body;

    try {

        
        const { fotoUrl, foto_VehiculoUrl } = await this.usuarioRepository.uploadImage(foto, foto_Vehiculo);

        res.status(200).json({ message: 'Las imágenes se cargaron correctamente', fotoUrl, foto_VehiculoUrl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al cargar las imágenes' });
    }
  }
  
  

};
export { UsuarioController };
