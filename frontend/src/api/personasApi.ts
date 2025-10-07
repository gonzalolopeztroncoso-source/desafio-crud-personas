import axios from "axios";

const API_URL = "http://localhost:8080/personas";

export const getPersonas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
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
