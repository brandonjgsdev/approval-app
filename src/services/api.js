// api.js

import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com",
  // Aquí puedes agregar configuraciones adicionales como headers, auth, etc.
});

console.log("aaaaaaaaaa");

export default {
  // Ejemplo de una función para obtener datos
  async getData() {
    try {
      const response = await apiClient.get("/data");
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener datos");
    }
  },

  // Ejemplo de una función para enviar datos
  async sendData(data) {
    try {
      const response = await apiClient.post("/data", data);
      return response.data;
    } catch (error) {
      throw new Error("Error al enviar datos");
    }
  },
};
