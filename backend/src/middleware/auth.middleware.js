const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
    const encabezado = req.headers['authorization'];

    if (!encabezado) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó token.' });
    }

    const token = encabezado.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Formato de token inválido.' });
    }

    try {
        const datos = jwt.verify(token, process.env.JWT_SECRETO);
        req.usuario = datos;
        next();
    } catch (error) {
        return res.status(403).json({ mensaje: 'Token inválido o expirado.' });
    }
};

module.exports = { verificarToken };