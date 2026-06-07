import axios from 'axios';

const URL_BASE = 'https://localhost:4000/api/auth';

const registrar = async (username, password) => {
    const respuesta = await axios.post(`${URL_BASE}/registrar`, { username, password });
    return respuesta.data;
};

const iniciarSesion = async (username, password) => {
    const respuesta = await axios.post(`${URL_BASE}/login`, { username, password });
    return respuesta.data;
};

const eliminarCuenta = async (token) => {
    const respuesta = await axios.delete(`${URL_BASE}/eliminar-cuenta`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return respuesta.data;
};

const authServicio = { registrar, iniciarSesion, eliminarCuenta };
export default authServicio;