import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + 'carta';
const CATEGORIA_URL = import.meta.env.VITE_BASE_URL + 'categoria'; 

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

  createCarta(data){
    return axios.post(BASE_URL, data, {
      headers: { "Content-Type": "multipart/form-data" } //  para imagen
    });
  }

  updateCarta(id, data){
    return axios.post(BASE_URL + '/' + id, data, { // usa POST para formData
      headers: { "Content-Type": "multipart/form-data" }
    });
  }

  deleteCarta(id){
    return axios.delete(BASE_URL + '/' + id);
  }

  //  CLAVE CATEGORÍA 
  getCategorias(){
    return axios.get(CATEGORIA_URL);
  }

}

export default new CartaService();