const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USUARIO,
    password: process.env.DB_CONTRASENA,
    host: process.env.DB_HOST,
    port: process.env.DB_PUERTO,
    database: process.env.DB_NOMBRE,
});

pool.connect()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch((error) => console.error('Error al conectar a la base de datos:', error));

module.exports = pool;