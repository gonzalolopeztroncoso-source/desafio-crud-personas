import { useState, useEffect } from "react";
import { savePersona, updatePersona } from "../api/personasApi";

interface PersonaFormProps {
  onPersonaAdded: () => void;
  personaEdit?: any; 
}

const PersonaForm = ({ onPersonaAdded, personaEdit }: PersonaFormProps) => {
  const [formData, setFormData] = useState({
    id: null,
    rut: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    direccion: {
      calle: "",
      comuna: "",
      region: "",
    },
  });

  useEffect(() => {
    if (personaEdit) {
      setFormData(personaEdit);
    }
  }, [personaEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (["calle", "comuna", "region"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        direccion: { ...prev.direccion, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.rut.trim()) {
      alert("El RUT es obligatorio");
      return;
    }
    if (!formData.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }
    if (!formData.apellido.trim()) {
      alert("El apellido es obligatorio");
      return;
    }
    if (!formData.fechaNacimiento) {
      alert("La fecha de nacimiento es obligatoria");
      return;
    }

    try {
      if (formData.id) {
        await updatePersona(formData.id, formData);
        alert("Persona actualizada correctamente");
      } else {
        await savePersona(formData);
        alert("Persona creada correctamente");
      }

      onPersonaAdded();

      setFormData({
        id: null,
        rut: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        direccion: { calle: "", comuna: "", region: "" },
      });
    } catch (err) {
      console.error("Error al guardar persona", err);
      alert("Error al guardar persona");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="rut"
        value={formData.rut}
        onChange={handleChange}
        placeholder="RUT"
      />
      <input
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
      />
      <input
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        placeholder="Apellido"
      />
      <input
        type="date"
        name="fechaNacimiento"
        value={formData.fechaNacimiento}
        onChange={handleChange}
      />
      <input
        name="calle"
        value={formData.direccion.calle}
        onChange={handleChange}
        placeholder="Calle"
      />
      <input
        name="comuna"
        value={formData.direccion.comuna}
        onChange={handleChange}
        placeholder="Comuna"
      />
      <input
        name="region"
        value={formData.direccion.region}
        onChange={handleChange}
        placeholder="Región"
      />

      <button type="submit">
        {formData.id ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
};

export default PersonaForm;
