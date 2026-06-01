const express = require('express');
const enrutador = express.Router();
const { obtenerNotas, obtenerNotaPorId, crearNota, actualizarNota, cambiarEstado, eliminarNota } = require('../controllers/notas.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

enrutador.use(verificarToken);

enrutador.get('/usuario', obtenerNotas);
enrutador.get('/:id', obtenerNotaPorId); 
enrutador.post('/', crearNota);
enrutador.put('/:id', actualizarNota);
enrutador.patch('/:id/estado', cambiarEstado);
enrutador.delete('/:id', eliminarNota);

module.exports = enrutador;