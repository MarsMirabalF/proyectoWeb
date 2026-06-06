const express = require('express');
const enrutador = express.Router();
const subida = require('../config/multer');
const {
    obtenerArchivos,
    subirArchivo,
    actualizarArchivo,
    eliminarArchivo,
    descargarArchivo
} = require('../controllers/archivos.controller');

const { verificarToken } = require('../middlewares/auth.middleware');
const { manejarEtag } = require('../middlewares/etag.middleware');

enrutador.use(verificarToken);

enrutador.get('/', manejarEtag , obtenerArchivos);
enrutador.post('/subir', subida.single('archivo'), subirArchivo);
enrutador.put('/:id', actualizarArchivo);
enrutador.get('/descargar/:id', descargarArchivo);
enrutador.delete('/:id', eliminarArchivo);

module.exports = enrutador;