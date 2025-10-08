import { useState } from "react";
import PersonaList from "../components/PersonaList";
import PersonaForm from "../components/PersonaForm";
import { useNavigate } from "react-router-dom";
import type { Persona } from "../types/Persona";


interface PersonasPageProps {
  isAdding?: boolean;
}

const PersonasPage = ({ isAdding = false }: PersonasPageProps) => {
  const [reload, setReload] = useState(false);
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);
  const navigate = useNavigate();

  const handlePersonaAdded = () => {
    setReload(!reload);
    navigate("/personas"); // vuelve al listado después de guardar
  };

  const handleEdit = (persona: Persona) => {
    setEditingPersona(persona);
    navigate("/personas/agregar"); // redirige al formulario de edición
  };

  return (
    <div className="personas-page">
      {!isAdding ? (
        <PersonaList reload={reload} onEdit={handleEdit} />
      ) : (
        <PersonaForm
          onPersonaAdded={handlePersonaAdded}
          personaEdit={editingPersona}
        />
      )}
    </div>
  );
};

export default PersonasPage;
