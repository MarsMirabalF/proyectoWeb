notas.controller

const pool = require('../config/db');

const obtenerNotas = async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const resultado = await pool.query(
            'SELECT * FROM notas WHERE usuario_id = $1 ORDER BY created_at DESC',
            [usuario_id]
        );

        res.status(200).json({ notas: resultado.rows });
    } catch (error) {
        console.error('Error al obtener notas:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

const crearNota = async (req, res) => {
    const { usuario_id, titulo, detalle, hora, fecha } = req.body;

    if (!usuario_id || !titulo) {
        return res.status(400).json({ mensaje: 'El usuario_id y el título son obligatorios.' });
    }

    try {
        const resultado = await pool.query(
            `INSERT INTO notas (usuario_id, titulo, detalle, hora, fecha)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [usuario_id, titulo, detalle, hora, fecha]
        );

        res.status(201).json({
            mensaje: 'Nota creada exitosamente.',
            nota: resultado.rows[0],
        });
    } catch (error) {
        console.error('Error al crear nota:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

module.exports = { obtenerNotas, crearNota };