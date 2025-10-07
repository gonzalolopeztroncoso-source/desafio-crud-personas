import PersonaList from "../components/PersonaList";
import PersonaForm from "../components/PersonaForm";
import { useState } from "react";

const PersonasPage = () => {
    const [reload, setReload] = useState(false);
    const [personaEdit, setPersonaEdit] = useState(null);

    return (
        <div>
            <h2>Gestión de Personas</h2>
            <PersonaForm
                onPersonaAdded={() => setReload(!reload)}
                personaEdit={personaEdit}
            />
            <PersonaList
                reload={reload}
                onEdit={(p) => setPersonaEdit(p)} 
            />
        </div>
    );
};

export default PersonasPage;