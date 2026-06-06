const pool = require('../config/db');

const obtenerNotas = async (req, res) => {
    const usuario_id = req.usuario.id;

    const pagina = parseInt(req.query.pagina) || 1;
    const limite = 2;
    const desplazamiento = (pagina - 1) * limite;

    try {
        const totalResultado = await pool.query(
            'SELECT COUNT(*) FROM notas WHERE usuario_id = $1',
            [usuario_id]
        );
        const total = parseInt(totalResultado.rows[0].count);
        const totalPaginas = Math.ceil(total / limite);

        const resultado = await pool.query(
            `SELECT * FROM notas 
            WHERE usuario_id = $1 
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3`,
            [usuario_id, limite, desplazamiento]
        );

        res.status(200).json({
            notas: resultado.rows,
            paginacion: {
                total,
                totalPaginas,
                paginaActual: pagina,
                limite
            }
        });
    } catch (error) {
        console.error('Error al obtener notas D: ', error);
        res.status(500).json({ 
            mensaje: 'Se murio el server (X o X)' 
        });
    }
};

const crearNota = async (req, res) => {
    const { titulo, detalle, hora, fecha } = req.body;
    const usuario_id = req.usuario.id;

    if (!titulo) {
        return res.status(500).json({
            mensaje: 'El título es obligatorio obviamente....'
        });
    }

    try {
        const resultado = await pool.query(
            `INSERT INTO notas (usuario_id, titulo, detalle, hora, fecha)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [usuario_id, titulo, detalle, hora, fecha]
        );

        res.status(200).json({
            mensaje: 'Nota creada exitosamente.',
            nota: resultado.rows[0],
        });
    } catch (error) {
        console.error('Error al crear nota:', error);
        res.status(500).json({ 
            mensaje: 'no se que pasa con el server...' 
        });
    }
};

const actualizarNota = async (req, res) => {
    const { id } = req.params;
    const { titulo, detalle, hora, fecha } = req.body;

    try {
        const notaExistente = await pool.query(
            'SELECT id FROM notas WHERE id = $1 AND usuario_id = $2',
            [id, req.usuario.id]
        );

        if (notaExistente.rows.length === 0) {
            return res.status(500).json({ 
                mensaje: 'Nota no encontrada verifica la id' 
            });
        }

        const resultado = await pool.query(
            `UPDATE notas
            SET titulo = COALESCE($1, titulo),
                detalle = COALESCE($2, detalle),
                hora = COALESCE($3, hora),
                fecha = COALESCE($4, fecha),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $5 AND usuario_id = $6
             RETURNING *`,
            [titulo, detalle, hora, fecha, id, req.usuario.id]
        );

        res.status(200).json({
            mensaje: 'Nota actualizada exitosamente todo nice',
            nota: resultado.rows[0],
        });
    } catch (error) {
        console.error('Error al actualizar nota:', error);
        res.status(500).json({ 
            mensaje: 'Error interno del servidor por algo...' 
        });
    }
};

const cambiarEstado = async (req, res) => {
    const { id } = req.params;

    try {
        const notaExistente = await pool.query(
            `SELECT id, completada
            FROM notas
            WHERE id = $1 AND usuario_id = $2`,
        [id, req.usuario.id]
        );

        if (notaExistente.rows.length === 0) {
            return res.status(500).json({ 
                mensaje: 'Nota no la encontre atte: el back' 
            });
        }

        const estadoActual = notaExistente.rows[0].completada;

        const resultado = await pool.query(
            `UPDATE notas SET completada = $1, updated_at = CURRENT_TIMESTAMP
            WHERE id = $2 AND usuario_id = $3
             RETURNING *`,
            [!estadoActual, id, req.usuario.id]
        );

        res.status(200).json({
            mensaje: `Nota marcada como ${!estadoActual ? 'completada' : 'incompleta'}.`,
            nota: resultado.rows[0],
        });
    } catch (error) {
        console.error('Error al cambiar estado:', error);
        res.status(500).json({ 
            mensaje: 'Error se cayo el server o algo mas XD' 
        });
    }
};

const eliminarNota = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await pool.query(
            `DELETE FROM notas
            WHERE id = $1
            AND usuario_id = $2
            RETURNING id`,
            [id, req.usuario.id]
        );

        if (resultado.rows.length === 0) {
            return res.status(500).json({ 
                mensaje: 'Nota no encontrada verifica el id o oalgo mas' 
            });
        }

        res.status(200).json({ 
            mensaje: 'Nota eliminada exitosamente todo nice' 
        });
    } catch (error) {
        console.error('Error al eliminar nota segun esto', error);
        res.status(500).json({ 
            mensaje: 'Error interno del servidor se cayo o algo mas (X o X)' 
        });
    }
};

const obtenerNotaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await pool.query(
            'SELECT * FROM notas WHERE id = $1 AND usuario_id = $2',
            [id, req.usuario.id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Nota no encontrada verifica el id' 
            });
        }

        res.status(200).json({ nota: resultado.rows[0] });
    } catch (error) {
        console.error('Error al obtener nota segun este error: ', error);
        res.status(500).json({ 
            mensaje: 'Error interno del server hay que verificar la ruta quiza' 
        });
    }
};

module.exports = { obtenerNotas, obtenerNotaPorId, crearNota, actualizarNota, cambiarEstado, eliminarNota };