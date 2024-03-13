
import { SupabaseClientSingleton } from '../data/dbContection.js';
import { Usuario } from '../Models/Usuario.js';
import bcrypt from 'bcryptjs';

class UsuarioRepository {
  constructor() {
    this.supabase = SupabaseClientSingleton.getInstance();
    this.usuario = "usuario";
    this.tableName = 'usuario';
  }

  mapToUserInstance(id, correo, nombre, apellido, cedula, role, estado, horario_entrada, horario_salida, salario, contrasena) {
    return new Usuario(
      id,
      correo,
      nombre,
      apellido,
      cedula,
      role,
      estado,
      horario_entrada,
      horario_salida,
      salario,
      contrasena // Aquí asigno la contraseña al campo correcto
    );
  }

  async getAllUsers() {
    try {
      const { data, error } = await this.supabase.from(this.tableName).select('*');
      if (error) console.log(error.message);
      return data.map(this.mapToUserInstance);
    } catch (error) {
      console.log(error.message);
    }
  }
  async getUserById(userId) {
    try {
      const { data, error } = await this.supabase.from(this.tableName).select('*').eq('id', userId);
      if (error) throw error;
      return data.length > 0 ? this.mapToUserInstance(data[0]) : null;
    } catch (error) {
      throw error;
    }
  }
  async getUserByCedula(cedula) {
    try {
      const { data, error } = await this.supabase.from(this.tableName).select('*').eq('cedula', cedula);
      if (error) throw error;
      return data.length > 0 ? this.mapToUserInstance(data[0]) : null;
    } catch (error) {
      throw error;
    }
  }
  async getUserByEmail(email) {
    try {
      const { data, error } = await this.supabase.from(this.tableName).select('*').eq('correo', email);
      if (error) throw error;
      return data.length > 0 ? this.mapToUserInstance(data[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  async createUser({ nombre, apellido, cedula, correo, role, estado, horario_entrada, horario_salida, salario, contrasena }) {

    try {

      const newUser = await this.supabase.from(this.tableName).upsert([{
        nombre,
        apellido,
        cedula,
        correo,
        estado,
        horario_entrada,
        horario_salida,
        salario,
        role: 'USUARIO',
        contrasena
      }]);

      return this.mapToUserInstance(newUser[0]);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, updatedUserData) {
    try {
      const { data, error } = await this.supabase.from(this.tableName).upsert([
        {
          id: userId,
          ...updatedUserData,
        },
      ]);
      if (error) throw error;
      return this.mapToUserInstance(data[0]);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const { data, error } = await this.supabase.from(this.tableName).delete().eq('id', userId);
      if (error) throw error;

      return this.mapToUserInstance(data[0]);
    } catch (error) {
      throw error;
    }
  }
  async updateUserPasswordByEmail(email, newPassword) {
    try {
      const usuarioActual = await this.getUserByEmail(email);

      if (!usuarioActual) {
        throw new Error('Usuario no encontrado');
      }

      // Actualizar la contraseña del usuario
      const { data, error } = await this.supabase
        .from(this.usuario)
        .update({ contrasena: newPassword })
        .eq('correo', email);

      if (error) {
        throw error;
      }

      return { mensaje: 'Contraseña actualizada correctamente' };
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const { data, error } = await this.supabase
        .from(this.usuario)
        .select('*')
        .eq('correo', email);

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        return null;
      }

      return this.mapToUserInstance(data[0]);
    } catch (error) {
      throw error;
    }
  }



  //funsion para interactuar con la db
  async loginUser(cedula, contrasena) {
    try {
      if (cedula.length !== 11) {
        throw new Error('La cédula debe tener al menos 11 dígitos');
      }
      if (typeof contrasena !== 'string' || contrasena.trim().length === 0) {
        throw new Error('La contraseña no puede estar vacía');
      }

      console.log("Consultando la base de datos para el usuario con cédula:", cedula);

      const { data, error } = await this.supabase
        .from(this.usuario)
        .select('*')
        .eq('cedula', cedula);

      if (error) throw error;
      if (data.length === 0) throw new Error('Usuario no encontrado');

      const userData = data[0];
      const user = new Usuario();
      user.id = userData.id;
      user.correo = userData.correo;
      user.nombre = userData.nombre;
      user.apellido = userData.apellido;
      user.cedula = userData.cedula;
      user.role = userData.role;
      user.estado = userData.estado;
      user.horario_entrada = userData.horario_entrada; // Aquí se almacena la contraseña
      user.horario_salida = userData.horario_salida;
      user.salario = userData.salario;
      user.telefono = userData.telefono;
      user.foto = userData.foto;
      user.foto_Vehiculo = userData.foto_Vehiculo;
      user.contrasena = userData.contrasena;

      console.log("Usuario encontrado en la base de datos:", user);

      // Verificar si la contraseña almacenada es una cadena
      if (typeof user.contrasena !== 'string') {
        throw new Error('La contraseña almacenada no es una cadena');
      }

      const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);
      console.log("¿La contraseña proporcionada coincide con la almacenada?", passwordMatch);

      if (!passwordMatch) {
        throw new Error('Contraseña incorrecta');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }



  async getUserNameByCedula(cedula) {
    try {
      // Realizar la consulta a la base de datos para obtener el nombre del usuario
      const { data, error } = await this.supabase
        .from(this.usuario)
        .select('nombre')
        .eq('cedula', cedula);

      if (error) {
        throw error;
      }

      // Verificar si se encontraron datos
      if (!data || data.length === 0) {
        throw new Error('Usuario no encontrado');
      }

      // Extraer el nombre del usuario de los datos devueltos por la consulta
      const { nombre } = data[0];
      return nombre;
    } catch (error) {
      throw error;
    }
  }


  async updateUserByNewPassword(req, res) {
    const userId = req.params.id; // Obtener el ID del usuario de la solicitud
    const { newPassword } = req.body; // Obtener la nueva contraseña del cuerpo de la solicitud

    try {
      // Actualizar la contraseña del usuario con la nueva contraseña
      await this.usuarioRepository.updateUserPassword(userId, newPassword);

      // Enviar una respuesta de éxito al cliente
      res.json({ mensaje: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      // Manejar errores y enviar una respuesta de error al cliente
      console.error(error);
      res.status(500).send('Error actualizando contraseña del usuario');
    }
  }

}

export { UsuarioRepository };