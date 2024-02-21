
import { SupabaseClientSingleton } from '../data/dbContection.js';
import { Usuario } from '../Models/Usuario.js'; 
import bcrypt from 'bcryptjs';

class UsuarioRepository {
  constructor() {
    this.supabase = SupabaseClientSingleton.getInstance();
    this.usuario = "usuario"
    this.tableName = 'usuario';
  }

  // Las funciones que convierten datos en los maps no deben ser asincronas.
  mapToUserInstance(data) {
    return new Usuario(  
      data.id,
      data.nombre,
      data.apellido,
      data.cedula,
      data.role,
      data.estado,
      data.horario_entrada,
      data.horario_salida,
      data.salario,
      data.telefono,
      data.foto,
      data.foto_Vehiculo,
      data.contrasena,
      data.correo
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

  async createUser(userData) {
    try {
      const { data, error } = await this.supabase.from(this.tableName).upsert([userData]);
      if (error) throw error;

      return this.mapToUserInstance(data[0]);
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
      // Valida que la cédula tenga al menos 11 dígitos
      if (cedula.length !== 11) {
        throw new Error('La cédula debe tener al menos 11 dígitos');
      }
      if (typeof contrasena !== 'string' || contrasena.trim().length === 0) {
        throw new Error('La contraseña no puede estar vacía');
      }
      //Consulta a la db
      const { data, error } = await this.supabase
        .from(this.usuario)
        .select('*')
        .eq('cedula', cedula);

      if (error) throw error;
      if (data.length === 0) throw new Error('Usuario no encontrado');

      const user = this.mapToUserInstance(data[0]);

      // Compara la contraseña proporcionada con la almacenada en la base de datos
      if (contrasena ==! user.contrasena) {
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

  /*async updateUserByNewPassword(req, res) {
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
}*/

}

export {UsuarioRepository};