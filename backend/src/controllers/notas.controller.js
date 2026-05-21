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

const actualizarNota = async (req, res) => {
    const { id } = req.params;
    const { titulo, detalle, hora, fecha } = req.body;

    try {
        const notaExistente = await pool.query(
            'SELECT id FROM notas WHERE id = $1',
            [id]
        );

        if (notaExistente.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Nota no encontrada.' });
        }

        const resultado = await pool.query(
            `UPDATE notas
             SET titulo = COALESCE($1, titulo),
                 detalle = COALESCE($2, detalle),
                 hora = COALESCE($3, hora),
                 fecha = COALESCE($4, fecha),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $5
             RETURNING *`,
            [titulo, detalle, hora, fecha, id]
        );

        res.status(200).json({
            mensaje: 'Nota actualizada exitosamente.',
            nota: resultado.rows[0],
        });
    } catch (error) {
        console.error('Error al actualizar nota:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

const cambiarEstado = async (req, res) => {
    const { id } = req.params;

    try {
        const notaExistente = await pool.query(
            'SELECT id, completada FROM notas WHERE id = $1',
            [id]
        );

        if (notaExistente.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Nota no encontrada.' });
        }

        const estadoActual = notaExistente.rows[0].completada;

        const resultado = await pool.query(
            `UPDATE notas SET completada = $1, updated_at = CURRENT_TIMESTAMP
             WHERE id = $2
             RETURNING *`,
            [!estadoActual, id]
        );

        res.status(200).json({
            mensaje: `Nota marcada como ${!estadoActual ? 'completada' : 'incompleta'}.`,
            nota: resultado.rows[0],
        });
    } catch (error) {
        console.error('Error al cambiar estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

const eliminarNota = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await pool.query(
            'DELETE FROM notas WHERE id = $1 RETURNING id',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Nota no encontrada.' });
        }

        res.status(200).json({ mensaje: 'Nota eliminada exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar nota:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

const obtenerNotaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await pool.query(
            'SELECT * FROM notas WHERE id = $1',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Nota no encontrada.' });
        }

        res.status(200).json({ nota: resultado.rows[0] });
    } catch (error) {
        console.error('Error al obtener nota:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

module.exports = { obtenerNotas, obtenerNotaPorId, crearNota, actualizarNota, cambiarEstado, eliminarNota };