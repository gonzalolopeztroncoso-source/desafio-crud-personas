import { Link, Outlet, useLocation } from "react-router-dom";
import "../styles/layout.css";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="layout">
      {/* 🔹 Sidebar */}
      <aside className="sidebar">
        <h2>Gestión Personas</h2>

        <Link
          to="/personas"
          className={location.pathname === "/personas" ? "active" : ""}
        >
          🧾 Listar Personas
        </Link>

        <Link
          to="/personas/agregar"
          className={location.pathname === "/personas/agregar" ? "active" : ""}
        >
          ➕ Agregar Persona
        </Link>
      </aside>

      {/* 🔹 Contenido principal */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
