const express = require('express');
const enrutador = express.Router();
const subida = require('../config/multer');

const {
    obtenerArchivos,
    subirArchivo,
    actualizarArchivo,
    eliminarArchivo
} = require('../controllers/archivos.controller');

enrutador.get('/usuario/:usuario_id', obtenerArchivos);
enrutador.post('/subir/:usuario_id', subida.single('archivo'), subirArchivo);
enrutador.put('/:id', actualizarArchivo);
enrutador.delete('/:id', eliminarArchivo);

module.exports = enrutador;