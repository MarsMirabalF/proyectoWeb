import axios from 'axios';

const URL_BASE = 'http://localhost:4000/api/archivos';

let etagArchivos = null;

const obtenerArchivos = async (pagina = 1, limite = 12) => {
    const cabeceras = {};
    if (etagArchivos){
        cabeceras['If-None-Match'] = etagArchivos;
    }

    const respuesta = await axios.get(`${URL_BASE}`, {
        params: { pagina, limite },
        headers: cabeceras,
    });
    etagArchivos = respuesta.headers['etag'];
    return respuesta.data;
};

const subirArchivo = async (archivo) => {
    const formulario = new FormData();
    formulario.append('archivo', archivo);
    const respuesta = await axios.post(`${URL_BASE}/subir`, formulario);
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

const descargarArchivo = async (id, nombre) => {
    const respuesta = await axios.get(
        `${URL_BASE}/descargar/${id}`,
        { responseType: 'blob' }
    );

    const url = URL.createObjectURL(respuesta.data);

    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = nombre;
    enlace.click();

    URL.revokeObjectURL(url);
};

const archivosServicio = { obtenerArchivos, subirArchivo, actualizarArchivo, eliminarArchivo, descargarArchivo };
export default archivosServicio;