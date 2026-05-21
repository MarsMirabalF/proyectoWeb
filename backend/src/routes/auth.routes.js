const express = require('express');
const enrutador = express.Router();
const { registrar, eliminarCuenta } = require('../controllers/auth.controller');

enrutador.post('/registrar', registrar);
enrutador.delete('/eliminar-cuenta/:id', eliminarCuenta);

module.exports = enrutador;