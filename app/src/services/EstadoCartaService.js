import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'director';

class EstadoCartaService {
  getEstadoCartas() {
    return axios.get(BASE_URL);
  }

  getEstadoCartaById(idEstadoCarta) {
    return axios.get(BASE_URL + '/' + idEstadoCarta);
  }
  getCartasbyEstadoCarta(idEstadoCarta) {
    return axios.get(BASE_URL + '/getCartasbyEstadoCarta/' + idEstadoCarta);
  }
}

export default new EstadoCartaService();
