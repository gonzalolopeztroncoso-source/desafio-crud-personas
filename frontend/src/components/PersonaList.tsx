import { useEffect, useState } from "react";
import { getPersonas, deletePersona } from "../api/personasApi";
import "../styles/list.css";
import Swal from "sweetalert2";

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
    const result = await Swal.fire({
      title: "¿Seguro que deseas eliminar esta persona?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deletePersona(id);
        setPersonas(personas.filter((p) => p.id !== id));

        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "La persona fue eliminada correctamente",
          timer: 1800,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error al eliminar persona:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la persona. Intenta nuevamente.",
        });
      }
    }
  };

  return (
    <div className="persona-list-container">
      <h3>Lista de Personas</h3>

      <table className="tabla-personas">
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
                  <div className="acciones">
                    <button className="btn-editar" onClick={() => onEdit(p)}>
                      ✏️ Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleDelete(p.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="no-data">
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
