import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'categoria';

class CategoriaService {
  getCategorias() {
    return axios.get(BASE_URL);
  }

  getCategoriaById(idCategoria) {
    return axios.get(BASE_URL + '/' + idCategoria);
  }
  getCartasbyCategoria(idCategoria) {
    return axios.get(BASE_URL + '/getCartasbyCategoria/' + idCategoria);
  }
}

export default new CategoriaService();
