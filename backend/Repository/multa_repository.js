
import { SupabaseClientSingleton } from '../Data/dbContection.js';
import { Multa } from '../Models/Multa.js';

class MultaRepository {
    constructor() {
      this.supabase = SupabaseClientSingleton.getInstance();
      this.tableName = 'multa';
    }
  
    mapToMultaInstance(data) {
      return new Multa(
        data.id,
        data.cedula_usuario,
        data.nombre_multado,
        data.matricula,
        data.placa,
        data.razon,
        new Date().toISOString(),
        data.monto,
        data.id_angente
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
  // En tu MultaRepository
  async getMultaByIDAgent(id_agente) {
    try {
        console.log('ID del agente:', id_agente);
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('id_angente', id_agente);
        console.log('Resultados de la consulta:', data);
        if (error) {
            console.error('Error al buscar las multas en el repositorio:', error);
            throw error;
        }
        return data.length > 0 ? data.map(this.mapToMultaInstance) : null;
    } catch (error) {
        console.error('Error al traer las multas en el repositorio:', error);
        throw error;
    }
}
  
    async createMulta(multaData) {
      try {
          console.log('Intentando insertar multa:', multaData);
          const { error } = await this.supabase.from(this.tableName).upsert([multaData]);
          if (error) throw error;
          console.log('Multa insertada exitosamente');
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