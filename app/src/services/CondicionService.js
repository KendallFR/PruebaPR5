import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'condicion';

class CondicionService {
  getCondiciones() {
    return axios.get(BASE_URL);
  }

  getCondicionById(idCondicion) {
    return axios.get(BASE_URL + '/' + idCondicion);
  }
  getCartabyCondicion(idCondicion) {
    return axios.get(BASE_URL + '/getCartabyCondicion/' + idCondicion);
  }
}

export default new CondicionService();