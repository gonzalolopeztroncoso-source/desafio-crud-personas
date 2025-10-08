import axios from "axios";
import type { Persona, PersonaFormData } from "../types/Persona";

//const API_URL = "http://localhost:8080/personas"; // local
const API_URL = import.meta.env.VITE_API_URL;

export const getPersonas = async (): Promise<Persona[]> => {
  const response = await axios.get(API_URL);
  if (Array.isArray(response.data)) return response.data as Persona[];
  if (response.data.content) return response.data.content as Persona[];
  console.warn("Respuesta inesperada del backend:", response.data);
  return [];
};

export const savePersona = async (persona: PersonaFormData): Promise<Persona> => {
  const response = await axios.post(API_URL, persona);
  return response.data;
};

export const deletePersona = async (id: number): Promise<void> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updatePersona = async (id: number, persona: PersonaFormData): Promise<Persona> => {
  const response = await axios.put(`${API_URL}/${id}`, persona);
  return response.data;
};
