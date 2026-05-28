const pool = require('../config/db');
const fs = require('fs');
const path = require('path');

const obtenerArchivos = async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const resultado = await pool.query(
            'SELECT * FROM archivos WHERE usuario_id = $1 ORDER BY created_at DESC',
            [usuario_id]
        );

        res.status(200).json({ archivos: resultado.rows });
    } catch (error) {
        console.error('Error al obtener archivos:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

const subirArchivo = async (req, res) => {
    const { usuario_id } = req.params;

    if (!req.file) {
        return res.status(400).json({ mensaje: 'No se envió ningún archivo.' });
    }

    try {
        const extension = path.extname(req.file.originalname).toLowerCase();
        const tamano = req.file.size;
        const nombre = req.file.originalname;

        const ruta = `repos/usuario_${usuario_id}/${req.file.filename}`;

        const resultado = await pool.query(
            `INSERT INTO archivos (usuario_id, nombre, extension, tamano, ruta)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [usuario_id, nombre, extension, tamano, ruta]
        );

        res.status(201).json({
            mensaje: 'Archivo subido exitosamente.',
            archivo: resultado.rows[0]
        });
    } catch (error) {
        console.error('Error al subir archivo:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

const actualizarArchivo = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ mensaje: 'El nuevo nombre es obligatorio.' });
    }

    try {
        const archivoExistente = await pool.query(
            'SELECT * FROM archivos WHERE id = $1',
            [id]
        );

        if (archivoExistente.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Archivo no encontrado.' });
        }

        const archivo = archivoExistente.rows[0];
        const extension = path.extname(archivo.ruta);
        const carpeta = path.dirname(archivo.ruta);

        const nombreLimpio = nombre.replace(/\s+/g, '_');
        const nuevaRuta = path.join(carpeta, `${Date.now()}_${nombreLimpio}${extension}`).replace(/\\/g, '/');

        fs.renameSync(archivo.ruta, nuevaRuta);


        const resultado = await pool.query(
            `UPDATE archivos
            SET nombre = $1, ruta = $2, updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *`,
            [nombre, nuevaRuta, id]
        );

        res.status(200).json({
            mensaje: 'Archivo actualizado exitosamente.',
            archivo: resultado.rows[0]
        });
    } catch (error) {
        console.error('Error al actualizar archivo:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};


const eliminarArchivo = async (req, res) => {
    const { id } = req.params;

    try {
        const archivoExistente = await pool.query(
            'SELECT * FROM archivos WHERE id = $1',
            [id]
        );

        if (archivoExistente.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Archivo no encontrado.' });
        }

        const archivo = archivoExistente.rows[0];

        
        if (fs.existsSync(archivo.ruta)) {
            fs.unlinkSync(archivo.ruta);
        }

        
        await pool.query('DELETE FROM archivos WHERE id = $1', [id]);

        res.status(200).json({ mensaje: 'Archivo eliminado exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar archivo:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};


module.exports = { obtenerArchivos, subirArchivo, actualizarArchivo, eliminarArchivo};