import axios from 'axios';

const URL_BASE = 'http://localhost:4000/api/archivos';

const obtenerArchivos = async (usuarioId) => {
    const respuesta = await axios.get(`${URL_BASE}/usuario/${usuarioId}`);
    return respuesta.data;
};

const subirArchivo = async (usuarioId, archivo) => {
    const formulario = new FormData();
    formulario.append('archivo', archivo);
    const respuesta = await axios.post(`${URL_BASE}/subir/${usuarioId}`, formulario, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return respuesta.data;
};

const actualizarArchivo = async (id, nombre) => {
    const respuesta = await axios.put(`${URL_BASE}/${id}`, { nombre });
    return respuesta.data;
};

const eliminarArchivo = async (id) => {
    const respuesta = await axios.delete(`${URL_BASE}/${id}`);
    return respuesta.data;
};

const archivosServicio = { obtenerArchivos, subirArchivo, actualizarArchivo, eliminarArchivo };
export default archivosServicio;