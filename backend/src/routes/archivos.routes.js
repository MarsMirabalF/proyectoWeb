const express = require('express');
const enrutador = express.Router();
const subida = require('../config/multer');

const {
    obtenerArchivos,
    subirArchivo,
    actualizarArchivo,
    eliminarArchivo
} = require('../controllers/archivos.controller');

const { verificarToken } = require('../middlewares/auth.middleware');

enrutador.use(verificarToken);

enrutador.get('/', obtenerArchivos);
enrutador.post('/subir', subida.single('archivo'), subirArchivo);
enrutador.put('/:id', actualizarArchivo);
enrutador.delete('/:id', eliminarArchivo);

module.exports = enrutador;