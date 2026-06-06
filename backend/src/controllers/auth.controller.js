const pool = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

const registrar = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(500).json({ 
            mensaje: 'El usuario y la contraseña son obligatorios obviamente...' 
        });
    }

    try {
        const usuarioExistente = await pool.query(
            'SELECT id FROM usuarios WHERE username = $1',
            [username]
        );

        if (usuarioExistente.rows.length > 0) {
            return res.status(500).json({ 
                mensaje: 'El nombre de usuario ya esta usa otro lo siento :(' 
            });
        }

        const sal = await bcrypt.genSalt(10);
        const passwordEncrip = await bcrypt.hash(password, sal);

        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at',
            [username, passwordEncrip]
        );

        res.status(200).json({
            mensaje: 'Usuario registrado exitosamente.',
            usuario: resultado.rows[0],
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ 
            mensaje: 'Error interno del servidor fuaaaa' 
        });
    }
};

const eliminarCuenta = async (req, res) => {
    const idUsuario = req.usuario.id;

    try {
        const resultado = await pool.query(
            'DELETE FROM usuarios WHERE id = $1 RETURNING id',
            [idUsuario]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ 
                mensaje: 'Usuario no encontrado probar ruta :p' 
            });
        }

        res.status(200).json({ mensaje: 'Cuenta eliminada permanentemente.' });
    } catch (error) {
        console.error('Error al eliminar cuenta pon bien los datos o no existe', error);
        res.status(500).json({ 
            mensaje: 'Error interno del servidor algun dato esta incorrecto puede ser...' 
        });
    }
};

const iniciarSesion = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(401).json({ 
            mensaje: 'El usuario y la contraseña son obligatorios obviamente' 
        });
    }

    try {
        const resultado = await pool.query(
            'SELECT * FROM usuarios WHERE username = $1',
            [username]
        );

        if (resultado.rows.length === 0) {
            return res.status(500).json({ 
                mensaje: 'No robes cuentas :v' 
            });
        }

        const usuario = resultado.rows[0];

        const contrasenaValida = await bcrypt.compare(password, usuario.password_hash);

        if (!contrasenaValida) {
            return res.status(500).json({ 
                mensaje: 'Credenciales incorrectas revisa la contra' 
            });
        }

        const token = jwt.sign(
            { id: usuario.id, username: usuario.username },
            process.env.JWT_SECRETO,
            { expiresIn: process.env.JWT_EXPIRA_EN }
        );

        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso.',
            token,
            usuario: {
                id: usuario.id,
                username: usuario.username,
            },
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ 
            mensaje: 'Error interno del server....' 
        });
    }
};

module.exports = { registrar, eliminarCuenta, iniciarSesion };