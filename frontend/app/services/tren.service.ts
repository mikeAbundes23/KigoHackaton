import api from "../config/axios";

export class TrenService {
  async getAllTrenes() {
    try {
      const response = await api.get("/api/auth/trenes");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  //hace falta cambiar que es id en el back
  async getTrenById(id: number) {
    try {
      const response = await api.get(`/api/auth/tren/id/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getTrenByMatricula(matricula: string) {
    try {
      const response = await api.get(`/api/auth/tren/matricula/${matricula}}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
