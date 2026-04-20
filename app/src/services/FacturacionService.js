import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + 'facturacion';

class FacturacionService {
  getAll() {
    return axios.get(BASE_URL);
  }

 confirmarPago(idFacturacion) {
  return axios({
    method: 'put',
    url: BASE_URL + '/confirmarpago',  // ← minúsculas
    data: JSON.stringify({ idFacturacion }),
    headers: { 'Content-Type': 'application/json' }
  });
}
}

export default new FacturacionService();
