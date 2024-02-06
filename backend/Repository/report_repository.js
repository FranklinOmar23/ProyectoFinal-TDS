
import { SupabaseClientSingleton } from './dbconnection';
import { Reporte } from '../Models/Report';

class ReporteRepository {
    constructor() {
      this.supabase = SupabaseClientSingleton.getInstance();
      this.tableName = 'reportes';
    }
  
    async mapToReporteInstance(data) {
      return new Reporte(
        data.id,
        data.tipo,
        data.razon,
        data.lugar,
        data.id_agente,
        data.comentario,
        data.fecha,
        data.estado,
        data.numero_testigo,
        data.id_usuario,
        data.requerimiento
      );
    }
  
    async getAllReportes() {
      try {
        const { data, error } = await this.supabase.from(this.tableName).select('*');
        if (error) throw error;
  
        return data.map(this.mapToReporteInstance);
      } catch (error) {
        throw error;
      }
    }
  
    async getReporteById(reporteId) {
      try {
        const { data, error } = await this.supabase.from(this.tableName).select('*').eq('id', reporteId);
        if (error) throw error;
  
        return data.length > 0 ? this.mapToReporteInstance(data[0]) : null;
      } catch (error) {
        throw error;
      }
    }
  
    async createReporte(reporteData) {
      try {
        const { data, error } = await this.supabase.from(this.tableName).upsert([reporteData]);
        if (error) throw error;
  
        return this.mapToReporteInstance(data[0]);
      } catch (error) {
        throw error;
      }
    }
  
    async updateReporte(reporteId, updatedReporteData) {
      try {
        const { data, error } = await this.supabase.from(this.tableName).upsert([
          {
            id: reporteId,
            ...updatedReporteData,
          },
        ]);
        if (error) throw error;
  
        return this.mapToReporteInstance(data[0]);
      } catch (error) {
        throw error;
      }
    }
  
    async deleteReporte(reporteId) {
      try {
        const { data, error } = await this.supabase.from(this.tableName).delete().eq('id', reporteId);
        if (error) throw error;
  
        return this.mapToReporteInstance(data[0]);
      } catch (error) {
        throw error;
      }
    }
  }
export { ReporteRepository };
