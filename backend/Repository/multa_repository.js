
import { SupabaseClientSingleton } from './dbconnection';
import { Multa } from '../Models/Multa';

class MultaRepository {
    constructor() {
      this.supabase = SupabaseClientSingleton.getInstance();
      this.tableName = 'multa';
    }
  
    async mapToMultaInstance(data) {
      return new Multa(
        data.id,
        data.cedula_usuario,
        data.matricula,
        data.placa,
        data.razon,
        data.fecha,
        data.monto
      );
    }
  
    async getAllMultas() {
      try {
        const { data, error } = await this.supabase.from(this.tableName).select('*');
        if (error) throw error;
  
        return data.map(this.mapToMultaInstance);
      } catch (error) {
        throw error;
      }
    }
  
    async getMultaById(multaId) {
      try {
        const { data, error } = await this.supabase.from(this.tableName).select('*').eq('id', multaId);
        if (error) throw error;
  
        return data.length > 0 ? this.mapToMultaInstance(data[0]) : null;
      } catch (error) {
        throw error;
      }
    }
  
    async createMulta(multaData) {
      try {
        const { data, error } = await this.supabase.from(this.tableName).upsert([multaData]);
        if (error) throw error;
  
        return this.mapToMultaInstance(data[0]);
      } catch (error) {
        throw error;
      }
    }
  
    async updateMulta(multaId, updatedMultaData) {
      try {
        const { data, error } = await this.supabase.from(this.tableName).upsert([
          {
            id: multaId,
            ...updatedMultaData,
          },
        ]);
        if (error) throw error;
  
        return this.mapToMultaInstance(data[0]);
      } catch (error) {
        throw error;
      }
    }
  
    async deleteMulta(multaId) {
      try {
        const { data, error } = await this.supabase.from(this.tableName).delete().eq('id', multaId);
        if (error) throw error;
  
        return this.mapToMultaInstance(data[0]);
      } catch (error) {
        throw error;
      }
    }
  }
  
  export { MultaRepository };