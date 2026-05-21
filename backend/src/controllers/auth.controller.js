const pool = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registrar = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ mensaje: 'El usuario y la contraseña son obligatorios.' });
    }

    try {
        const usuarioExistente = await pool.query(
            'SELECT id FROM usuarios WHERE username = $1',
            [username]
        );

        if (usuarioExistente.rows.length > 0) {
            return res.status(409).json({ mensaje: 'El nombre de usuario ya está en uso.' });
        }

        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at',
            [username, password]
        );

        res.status(201).json({
            mensaje: 'Usuario registrado exitosamente.',
            usuario: resultado.rows[0],
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

const eliminarCuenta = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await pool.query(
            'DELETE FROM usuarios WHERE id = $1 RETURNING id',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        res.status(200).json({ mensaje: 'Cuenta eliminada permanentemente.' });
    } catch (error) {
        console.error('Error al eliminar cuenta:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

module.exports = { registrar, eliminarCuenta };