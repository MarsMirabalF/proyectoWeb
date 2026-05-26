const multer = require('multer');
const path = require('path');
const fs = require('fs');

const almacenamiento = multer.diskStorage({

    destination: (req, file, cb) => {
        const { usuario_id } = req.params;
        const carpetaUsuario = path.join(__dirname, '../../repos', `usuario_${usuario_id}`);
    
        if (!fs.existsSync(carpetaUsuario)) {
            fs.mkdirSync(carpetaUsuario, { recursive: true });
        }

        cb(null, carpetaUsuario);
    },

    filename: (req, file, cb) => {
        const nombreLimpio = file.originalname.replace(/\s+/g, '_');
        //const nombreFinal = `${Date.now()}_${nombreLimpio}`;
        cb(null, nombreLimpio);
    }
});

const subida = multer({ storage: almacenamiento });

module.exports = subida;