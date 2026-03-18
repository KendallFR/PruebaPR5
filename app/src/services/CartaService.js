import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + 'carta';
class CartaService {

  getCartas() {
    return axios.get(BASE_URL);
  }

  getCartaById(CartaId){
    return axios.get(BASE_URL+'/'+CartaId);
  }
 
  getSubastasByCarta(id){
  return axios.get(BASE_URL + '/subastas/' + id);
}

  allCartasActivas(){
    return axios.get(BASE_URL + "/allCartasActivas/");
  }

}
export default new CartaService();