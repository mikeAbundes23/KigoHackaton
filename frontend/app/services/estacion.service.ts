import api from "../config/axios";

export class EstacionService {
  async getAll() {
    try {
      const response = await api.get("/api/auth/estacion/all");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const response = await api.get(`/api/auth/estacion/id/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getByNumber(number: number) {
    try {
      const response = await api.get(`/api/auth/estacion/numero/${number}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
