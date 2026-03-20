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
    return axios.post(BASE_URL, JSON.stringify(Subasta));
  }


//  PUT /subasta/update/1 luego controller=subasta, action=update, param1=1
updateSubasta(id, data) {
  return axios.put(
    BASE_URL + '/update/' + id,
    JSON.stringify(data)
  );
}

//  PUT /subasta/updateEstado/1  luego controller=subasta, action=updateEstado, param1=1
updateEstado(id, idEstadoSubasta) {
  return axios.put(
    BASE_URL + '/updateEstado/' + id,
    JSON.stringify({ idEstadoSubasta })
  );
}


}

export default new SubastaService();