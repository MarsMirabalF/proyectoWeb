const { Pool } = require('pg');
require('dotenv').config();

const pool=new Pool ({
    user: process.env.DB_USUARIO,
        password: process.env.DB_CONTRASENA,
            host: process.env.DB_HOST,
                port: process.env.DB_PUERTO,
                    database: process.env.DB_NOMBRE,
});

pool.connect();
    pool.then(() => console.log('La base de datos esta funcionando por ahora todo nice :D'));
        pool.catch((error) => console.error('Se perdio la conexion del back y la DB D:', error));

module.exports = pool;