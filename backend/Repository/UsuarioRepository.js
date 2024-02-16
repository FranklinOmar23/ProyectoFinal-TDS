
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
      data.photo,
      data.photo_Vehiculo,
      data.contrasena
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
  async updateUserPassword(userId, newPassword) {
    try {
      const usuarioActual = await this.getUserById(userId);

      if (!usuarioActual) {
        throw new Error('Usuario no encontrado');
      }
      usuarioActual.password = newPassword;
      const { data, error } = await this.supabase.from(this.tableName).upsert([
        {
          id: userId,
          ...usuarioActual, 
        },
      ]);

      if (error) {
        throw error;
      }

      return { mensaje: 'Contraseña actualizada correctamente' };
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
}

export {UsuarioRepository};