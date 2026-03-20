import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + 'carta';

class CartaService {

  getCartas() {
    return axios.get(BASE_URL);
  }

  getCartaById(CartaId){
    return axios.get(BASE_URL + '/' + CartaId);
  }
 
  getSubastasByCarta(id){
    return axios.get(BASE_URL + '/subastas/' + id);
  }

  allCartasActivas(){
    return axios.get(BASE_URL + "/allCartasActivas/");
  }

  createCarta(Carta) {
    return axios.post(BASE_URL, JSON.stringify(Carta));
  }

  updateCarta(Carta) {
    return axios({
      method: 'put',
      url: BASE_URL,
      data: JSON.stringify(Carta)

    })
  }

  deleteCarta(id){
    return axios.delete(BASE_URL + '/' + id);
  }
}
export default new CartaService();