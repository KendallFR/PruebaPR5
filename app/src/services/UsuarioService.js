import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + 'usuario';
class UsuarioService {
  //Definición para Llamar al API y obtener el listado de usuarios

  //Listas usuarios
  //http://localhost:81/proyectoSubasta/api/usuario
  getUsuarios() {
    return axios.get(BASE_URL);
  }
  //Obtener usuario
  //http://localhost:81/proyectoSubasta/api/usuario/1
  getUsuarioById(UsuarioId){
    return axios.get(BASE_URL+'/'+UsuarioId);
  }
createUser(User) {
  return axios.post(BASE_URL, User, {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
  loginUser(User) {
    return axios.post(BASE_URL + '/login/', JSON.stringify(User));
  }
}
export default new UsuarioService();