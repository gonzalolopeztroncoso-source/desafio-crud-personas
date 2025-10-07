import axios from "axios";

//const API_URL = "http://localhost:8080/personas"; // local
const API_URL = import.meta.env.VITE_API_URL;

export const getPersonas = async () => {
  const response = await axios.get(API_URL);
  if (Array.isArray(response.data)) return response.data;
  if (response.data.content) return response.data.content;
  console.warn("Respuesta inesperada del backend:", response.data);
  return [];
};

export const savePersona = async (persona: any) => {
  const response = await axios.post(API_URL, persona);
  return response.data;
};

export const deletePersona = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updatePersona = async (id: number, persona: any) => {
  const response = await axios.put(`${API_URL}/${id}`, persona);
  return response.data;
};
