import axios from 'axios';
//http://http://localhost:81/appmovie/api/movie/
const BASE_URL = import.meta.env.VITE_BASE_URL + 'carta';
class CartaService {
  //Definición para Llamar al API y obtener el listado de películas

  //Listas peliculas
  //http://localhost:81/proyectoSubasta/api/carta
  getCartas() {
    return axios.get(BASE_URL);
  }
  //Obtener pelicula
  //http://localhost:81/proyectoSubasta/api/carta/1
  getCartaById(CartaId){
    return axios.get(BASE_URL+'/'+CartaId);
  }
}
export default new CartaService();