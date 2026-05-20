const express = require('express');
const enrutador = express.Router();
const { obtenerNotas, crearNota, actualizarNota, cambiarEstado, eliminarNota } = require('../controllers/notas.controller');

enrutador.get('/', obtenerNotas);
enrutador.post('/', crearNota);
enrutador.put('/:id', actualizarNota);
enrutador.patch('/:id/estado', cambiarEstado);
enrutador.delete('/:id', eliminarNota);

module.exports = enrutador;