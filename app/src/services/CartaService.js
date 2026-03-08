import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + 'carta';
class CartaService {

  getCartas() {
    return axios.get(BASE_URL);
  }

  getCartaById(CartaId){
    return axios.get(BASE_URL+'/'+CartaId);
  }
}
export default new CartaService();