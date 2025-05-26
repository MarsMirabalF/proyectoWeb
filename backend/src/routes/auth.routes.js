const express = require('express');
const enrutador = express.Router();
const { registrar, eliminarCuenta, iniciarSesion } = require('../controllers/auth.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

enrutador.post('/registrar', registrar);
enrutador.delete('/eliminar-cuenta/:id', verificarToken, eliminarCuenta);
enrutador.post('/login', iniciarSesion);

module.exports = enrutador;