
import { SupabaseClientSingleton } from '../data/dbContection.js';
import { Usuario } from '../Models/Usuario.js';  

class UsuarioRepository {
  constructor() {
    this.supabase = SupabaseClientSingleton.getInstance();
    this.tableName = 'usuario';
  }

  async mapToUserInstance(data) {
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
      data.photo_Vehiculo
    );
  }

  async getAllUsers() {
    console.log(this.tableName)
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
}


export {UsuarioRepository};
