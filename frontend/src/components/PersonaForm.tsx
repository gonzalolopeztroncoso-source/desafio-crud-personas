import { useState, useEffect } from "react";
import { savePersona, updatePersona } from "../api/personasApi";
import "../styles/form.css";
import { toast } from "react-toastify";
import { validate, format } from "rut.js";
import { regiones } from "../data/regiones";

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
    direccion: { calle: "", comuna: "", region: "" },
  });

  useEffect(() => {
    if (personaEdit) {
      console.log("Editando persona:", personaEdit);
      setFormData({
        id: personaEdit.id,
        rut: personaEdit.rut,
        nombre: personaEdit.nombre,
        apellido: personaEdit.apellido,
        fechaNacimiento: personaEdit.fechaNacimiento || "",
        direccion: personaEdit.direccion || { calle: "", comuna: "", region: "" },
      });
    }
  }, [personaEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "rut") {
      const formatted = format(value);
      setFormData((prev) => ({ ...prev, rut: formatted }));
    } else if (["calle", "comuna", "region"].includes(name)) {
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

    const payload = {
    rut: formData.rut,
    nombre: formData.nombre,
    apellido: formData.apellido,
    fechaNacimiento: formData.fechaNacimiento,
    direccion: formData.direccion,
  };

    if (!validate(formData.rut)) {
      toast.warning("El RUT ingresado no es válido");
      return;
    }

    if (
      !formData.rut ||
      !formData.nombre ||
      !formData.apellido ||
      !formData.fechaNacimiento ||
      !formData.direccion.region ||
      !formData.direccion.comuna
    ) {
      toast.warning("Todos los campos son obligatorios");
      return;
    }

    try {
      if (formData.id) {
        await updatePersona(formData.id, payload);
        toast.success("Persona actualizada correctamente");
      } else {
        await savePersona(formData);
        toast.success("Persona agregada correctamente");
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
      toast.error("Error al guardar persona");
    }
  };

  return (
    <div className="form-container">
      <h3>{formData.id ? "✏️ Editar Persona" : "➕ Agregar Persona"}</h3>

      <form onSubmit={handleSubmit} className="persona-form">
        <div className="form-grid">
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

          {/* 🔽 Región */}
          <select
            name="region"
            value={formData.direccion.region}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                direccion: {
                  ...prev.direccion,
                  region: e.target.value,
                  comuna: "",
                },
              }))
            }
          >
            <option value="">Seleccione una región</option>
            {regiones.map((r) => (
              <option key={r.nombre} value={r.nombre}>
                {r.nombre}
              </option>
            ))}
          </select>

          {/* 🔽 Comuna dependiente */}
          <select
            name="comuna"
            value={formData.direccion.comuna}
            disabled={!formData.direccion.region}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                direccion: { ...prev.direccion, comuna: e.target.value },
              }))
            }
          >
            <option value="">Seleccione una comuna</option>
            {regiones
              .find((r) => r.nombre === formData.direccion.region)
              ?.comunas.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>

        <div className="acciones-formulario">
          <button type="submit" className="btn-guardar">
            {formData.id ? "Actualizar" : "Guardar"}
          </button>
          <button
            type="button"
            className="btn-limpiar"
            onClick={() =>
              setFormData({
                id: null,
                rut: "",
                nombre: "",
                apellido: "",
                fechaNacimiento: "",
                direccion: { calle: "", comuna: "", region: "" },
              })
            }
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonaForm;
