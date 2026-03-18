import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + 'subasta';

class SubastaService {

  allSubastasActivas() {
    return axios.get(BASE_URL + "/allSubastasActivas/");
  }

  allSubastasFinalizadas() {
    return axios.get(BASE_URL + "/allSubastasFinalizadas/");
  }

  getSubastaById(SubastaId) {
    return axios.get(BASE_URL + '/' + SubastaId);
  }

  getSubastaCarta(id) {
  return axios.get(BASE_URL + "/getSubastaCarta/" + id);
}

  createSubasta(Subasta) {
    return axios.post(BASE_URL + "/create", JSON.stringify(Subasta));
  }
}

export default new SubastaService();