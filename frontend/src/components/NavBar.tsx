import { Link } from "react-router-dom";

const NavBar = () => (
    <nav style={{ 
        backgroundColor: "#1976d2",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        gap: "20px"
    }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Inicio</Link>
        <Link to="/personas" style={{ color: "white", textDecoration: "none" }}>Personas</Link>
    </nav>
);

export default NavBar;
