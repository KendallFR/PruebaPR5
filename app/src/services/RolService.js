import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + 'rol';
class RolService {

  getRoles() {
    return axios.get(BASE_URL);
  }

  getRolById(idRol){
    return axios.get(BASE_URL+'/'+idRol);
  }
}
export default new RolService();