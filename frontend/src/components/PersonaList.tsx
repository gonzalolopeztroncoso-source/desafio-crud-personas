import { useEffect, useState } from "react";
import { getPersonas, deletePersona } from "../api/personasApi";

interface PersonaListProps {
  reload: boolean;
  onEdit: (persona: any) => void;
}

const PersonaList = ({ reload, onEdit }: PersonaListProps) => {
  const [personas, setPersonas] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPersonas();
        setPersonas(data);
      } catch (error) {
        console.error("Error al obtener personas:", error);
      }
    };
    fetchData();
  }, [reload]);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar esta persona?")) {
      try {
        await deletePersona(id);
        setPersonas(personas.filter((p) => p.id !== id));
        alert("Persona eliminada correctamente");
      } catch (error) {
        console.error("Error al eliminar persona:", error);
        alert("Error al eliminar persona");
      }
    }
  };

  return (
    <div>
      <h3>Lista de Personas</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.length > 0 ? (
            personas.map((p) => (
              <tr key={p.id}>
                <td>{p.rut}</td>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.edad ?? "-"}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No hay personas registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PersonaList;
