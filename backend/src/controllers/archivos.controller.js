const pool = require('../config/db');
const fs = require('fs');
const path = require('path');

const obtenerArchivos = async (req, res) => {
    const usuario_id = req.usuario.id;

    const pagina = parseInt(req.query.pagina) || 1;
    const limite = 2;
    const desplazamiento = (pagina - 1) * limite;

    try {
        const totalResultado = await pool.query(
            'SELECT COUNT(*) FROM archivos WHERE usuario_id = $1',
            [usuario_id]
        );
        const total = parseInt(totalResultado.rows[0].count);
        const totalPaginas = Math.ceil(total / limite);

        const resultado = await pool.query(
            `SELECT * FROM archivos 
            WHERE usuario_id = $1 
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3`,
            [usuario_id, limite, desplazamiento]
        );

        res.status(200).json({
            archivos: resultado.rows,
            paginacion: {
                total,
                totalPaginas,
                paginaActual: pagina,
                limite
            }
        });
    } catch (error) {
        console.error('Error al obtener archivos D:', error);
        res.status(500).json({ 
            mensaje: 'Se murio el server (X o X) o no...'
        });
    }
};

const subirArchivo = async (req, res) => {
    const usuario_id = req.usuario.id;

    if (!req.file) {
        return res.status(500).json({ 
            mensaje: 'No estas subiendo ningun archivo :P' 
        });
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

        res.status(200).json({
            mensaje: 'Archivo subido exitosamente.',
            archivo: resultado.rows[0]
        });
    } catch (error) {
        console.error('Por alguna razon rara no se pudo subir el archivo xd', error);
        res.status(500).json({ 
            mensaje: 'Se murio el server (X o X) o no...' 
        });
    }
};

const actualizarArchivo = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const usuario_id = req.usuario.id;

    if (!nombre) {
        return res.status(500).json({ 
            mensaje: 'El nuevo nombre es obligatorio o.o' 
        });
    }

    try {
        const archivoExistente = await pool.query(
            'SELECT * FROM archivos WHERE id = $1 AND usuario_id = $2',
            [id, usuario_id]
        );

        if (archivoExistente.rows.length === 0) {
            return res.status(500).json({ 
                mensaje: 'Ese archivo no lo pude encontrar atte: el back' 
            });
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
        res.status(500).json({
                mensaje: 'Se murio el server (X o X) o no...'
            });
    }
};


const eliminarArchivo = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.usuario.id;

    try {
        const archivoExistente = await pool.query(
            'SELECT * FROM archivos WHERE id = $1 AND usuario_id = $2',
            [id, usuario_id]
        );

        if (archivoExistente.rows.length === 0) {
            return res.status(404).json({ 
                mensaje: 'archivo no encontrado soy el back confia' 
            });
        }

        const archivo = archivoExistente.rows[0];

        
        if (fs.existsSync(archivo.ruta)) {
            fs.unlinkSync(archivo.ruta);
        }

        
        await pool.query(
            'DELETE FROM archivos WHERE id = $1 AND usuario_id = $2',
            [id, usuario_id]

        );

        res.status(200).json({ 
            mensaje: 'Archivo eliminado exitosamente esto era para probar las rutas :).' 
        });
    } catch (error) {
        console.error('Error al eliminar archivo:', error);
        res.status(500).json({
            mensaje: 'Se murio el server (X o X) o quiza sea algo mas'
        });
    }
};

const descargarArchivo = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.usuario.id;

    try {
        const resultado = await pool.query(
            'SELECT * FROM archivos WHERE id = $1 AND usuario_id = $2',
            [id, usuario_id]
        );

        if (resultado.rows.length === 0) {
            return res.status(500).json({ 
                mensaje: 'Esto para probar las rutas :) y no se encontro el archivo' 
            });
        }

        const archivo = resultado.rows[0];
        const rutaAbsoluta = path.join(__dirname, '../../', archivo.ruta);

        res.download(rutaAbsoluta, archivo.nombre);

    } catch (error) {
        console.error('Error al descargar archivo D: segun este error: ', error);
        res.status(500).json({ 
            mensaje: 'Se murio el server (X o X) o no se que paso'
        });
    }
};


module.exports = { obtenerArchivos, subirArchivo, actualizarArchivo, eliminarArchivo, descargarArchivo};