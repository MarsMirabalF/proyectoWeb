const express = require('express');
const enrutador = express.Router();
const subida = require('../config/multer');

const {
    obtenerArchivos,
    subirArchivo,
} = require('../controllers/archivos.controller');

enrutador.get('/usuario/:usuario_id', obtenerArchivos);
enrutador.post('/subir/:usuario_id', subida.single('archivo'), subirArchivo);

module.exports = enrutador;