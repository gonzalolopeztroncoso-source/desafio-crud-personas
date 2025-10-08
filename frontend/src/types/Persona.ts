export interface Direccion {
  calle: string;
  comuna: string;
  region: string;
}

export interface Persona {
  id: number;
  rut: string;
  nombre: string;
  apellido: string;
  fechaNacimiento?: string;
  edad?: number;
  direccion: Direccion;
}

export interface PersonaFormData {
  id: number | null; 
  rut: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  direccion: Direccion;
}
