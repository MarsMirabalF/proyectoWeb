require('dotenv').config();
const app = require('./src/app');

const PUERTO = process.env.PUERTO || 4000;

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});