const express = require('express');
const enrutador = express.Router();
const { obtenerNotas, obtenerNotaPorId, crearNota, actualizarNota, cambiarEstado, eliminarNota } = require('../controllers/notas.controller');

enrutador.get('/usuario/:usuario_id', obtenerNotas);
enrutador.get('/:id', obtenerNotaPorId); 
enrutador.post('/', crearNota);
enrutador.put('/:id', actualizarNota);
enrutador.patch('/:id/estado', cambiarEstado);
enrutador.delete('/:id', eliminarNota);

module.exports = enrutador;