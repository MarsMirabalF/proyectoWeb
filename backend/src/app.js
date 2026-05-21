const express = require('express');
const cors = require('cors');
require('dotenv').config();

const rutasAutenticacion = require('./routes/auth.routes');
const rutasNotas = require('./routes/notas.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', rutasAutenticacion);
app.use('/api/notas', rutasNotas);

app.get('/', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando correctamente' });
});

app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

module.exports = app;