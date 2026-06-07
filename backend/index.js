require('dotenv').config();
const https = require('https');
const fs = require('fs');
const app = require('./src/app');

const PUERTO = process.env.PUERTO || 4000;

const opciones = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(opciones, app).listen(PUERTO, () => {
    console.log(`Servidor HTTPS corriendo en https://localhost:${PUERTO}`);
});