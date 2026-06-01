const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const almacenamiento = multer.diskStorage({

    destination: (req, file, cb) => {
        const token = req.headers['authorization'].split(' ')[1];
        const datos = jwt.verify(token, process.env.JWT_SECRETO);
        const usuario_id = datos.id;

        const carpetaUsuario = path.join(__dirname, '../../repos', `usuario_${usuario_id}`);
    
        if (!fs.existsSync(carpetaUsuario)) {
            fs.mkdirSync(carpetaUsuario, { recursive: true });
        }

        cb(null, carpetaUsuario);
    },

    filename: (req, file, cb) => {
        const nombreLimpio = file.originalname.replace(/\s+/g, '_');
        const nombreFinal = `${Date.now()}_${nombreLimpio}`;
        cb(null, nombreFinal);
    }
});

const subida = multer({ storage: almacenamiento });

module.exports = subida;