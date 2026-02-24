import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

export default function UserCreate() {

  const navigate = useNavigate();

const [user, setUser] = useState({
  nombre: "",
  email: "",
  cedula: "",
  password: "",   
  idRol: "",
  idEstadoUsuario: ""
});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    UserService.createUser(user)
      .then(() => {
        alert("Usuario creado correctamente");
        navigate("/usuario");
      })
      .catch((err) => {
        console.error(err);
        setError("Error al crear usuario");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={containerStyle}>

      <div style={cardStyle}>

        <h2 style={titleStyle}>
          Crear Usuario
        </h2>

        {error && (
          <p style={errorStyle}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div style={formGroup}>
            <label style={labelStyle}>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={user.nombre}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroup}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroup}>
            <label style={labelStyle}>Cédula</label>
            <input
              type="text"
              name="cedula"
              value={user.cedula}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroup}>
             <label style={labelStyle}>Password</label>
                <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                style={inputStyle}
            />
            </div>

          <div style={formGroup}>
            <label style={labelStyle}>Rol</label>
            <select
              name="idRol"
              value={user.idRol}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Seleccione</option>
              <option value="1">Administrador</option>
              <option value="2">Vendedor</option>
            </select>
          </div>

          <div style={formGroup}>
            <label style={labelStyle}>Estado</label>
            <select
              name="idEstadoUsuario"
              value={user.idEstadoUsuario}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Seleccione</option>
              <option value="1">Activo</option>
              <option value="2">Inactivo</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={buttonStyle}
          >
            {loading ? "Guardando..." : "Crear Usuario"}
          </button>

        </form>

      </div>

    </div>
  );
}


/* ESTILOS */

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
  backgroundColor: "#0f172a"
};

const cardStyle = {
  backgroundColor: "#111827",
  padding: "30px",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "450px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#00c853"
};

const errorStyle = {
  color: "#ff5252",
  marginBottom: "10px",
  textAlign: "center"
};

const formGroup = {
  marginBottom: "15px"
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "500",
  color: "#e5e7eb"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #374151",
  backgroundColor: "#1f2937",
  color: "white",
  outline: "none"
};

const buttonStyle = {
  marginTop: "15px",
  padding: "12px",
  width: "100%",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#00c853",
  color: "white",
  fontWeight: "bold",
  fontSize: "15px",
  cursor: "pointer",
  transition: "0.3s"
};