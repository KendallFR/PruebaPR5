import { useEffect, useState } from "react";
import UserService from "../../services/UserService";

function UserList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const response = await UserService.getUsers();

            setUsers(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div>

            <h1>Usuarios</h1>

            <table border="1">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Estado</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map(user => (

                        <tr key={user.id}>

                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default UserList;