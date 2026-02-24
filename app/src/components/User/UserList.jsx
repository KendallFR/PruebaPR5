import { useEffect, useState } from "react";
import UserService from "../../services/UserService";

export default function UserList() {

  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    UserService.getUsers()
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      
      <h2 style={{
        color: "white",
        marginBottom: "20px",
        fontSize: "24px"
      }}>
        Lista de Usuarios
      </h2>

      <div style={{
        backgroundColor: "#111",
        padding: "20px",
        borderRadius: "10px"
      }}>

        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white"
        }}>

          <thead>
            <tr style={{
              backgroundColor: "#b91c1c",
              textAlign: "left"
            }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Rol</th>
              <th style={thStyle}>Estado</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.idUsuario} style={{ borderBottom: "1px solid #333" }}>
                <td style={tdStyle}>{user.idUsuario}</td>
                <td style={tdStyle}>{user.nombre}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.rol.nombre}</td>
                <td style={tdStyle}>
                  <span style={{
                    backgroundColor: "#16a34a",
                    padding: "4px 10px",
                    borderRadius: "6px"
                  }}>
                    {user.estadoUsuario.descripcion}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

const thStyle = {
  padding: "12px"
};

const tdStyle = {
  padding: "12px"
};