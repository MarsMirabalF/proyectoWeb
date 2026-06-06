import axios from 'axios';

const URL_BASE = 'http://localhost:4000/api/notas';

let etagNotas = null;

const obtenerNotas = async (pagina = 1, limite = 2) => {
    const cabeceras = {};
    if (etagNotas){
        cabeceras['If-None-Match'] = etagNotas;
    }

    const respuesta = await axios.get(`${URL_BASE}/usuario`, {
        params: { pagina, limite },
        headers: cabeceras,
    });
    etagNotas = respuesta.headers['etag'];
    return respuesta.data;
};

const obtenerNotaPorId = async (id) => {
    const respuesta = await axios.get(`${URL_BASE}/${id}`);
    return respuesta.data;
};

const crearNota = async (nota) => {
    const respuesta = await axios.post(`${URL_BASE}`, nota);
    return respuesta.data;
};

const actualizarNota = async (id, nota) => {
    const respuesta = await axios.put(`${URL_BASE}/${id}`, nota);
    return respuesta.data;
};

const cambiarEstado = async (id) => {
    const respuesta = await axios.patch(`${URL_BASE}/${id}/estado`);
    return respuesta.data;
};

const eliminarNota = async (id) => {
    const respuesta = await axios.delete(`${URL_BASE}/${id}`);
    return respuesta.data;
};

const notasServicio = { obtenerNotas, obtenerNotaPorId, crearNota, actualizarNota, cambiarEstado, eliminarNota };
export default notasServicio;