import { useState } from "react";
import PersonaForm from "./components/PersonaForm";
import PersonaList from "./components/PersonaList";
import "./styles.css";

const App = () => {
  const [reload, setReload] = useState(false);
  const [editingPersona, setEditingPersona] = useState<any | null>(null);

  return (
    <div className="container">
      <h1>🧾 CRUD Personas</h1>

      <PersonaForm
        onPersonaAdded={() => setReload(!reload)}
        personaEdit={editingPersona}
      />

      <PersonaList
        reload={reload}
        onEdit={setEditingPersona}
      />
    </div>
  );
};

export default App;