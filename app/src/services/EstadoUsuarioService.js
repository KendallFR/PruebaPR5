import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + 'estadoUsuario';
class EstadoUsuarioService {

  getEstadoUsuarios() {
    return axios.get(BASE_URL);
  }

  getEstadoUsuarioById(idEstadoUsuario){
    return axios.get(BASE_URL+'/'+idEstadoUsuario);
  }
}
export default new EstadoUsuarioService();