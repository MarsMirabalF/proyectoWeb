import { useState, useEffect, useCallback } from 'react';
import archivosServicio from '../../servicios/archivosServicio';

function Drive({ usuario }) {
    const [archivos, setArchivos] = useState([]);
    const [error, setError] = useState('');
    const [nombreEditar, setNombreEditar] = useState('');
    const [idEditando, setIdEditando] = useState(null);

    const cargarArchivos = useCallback(async () => {
        try {
            const datos = await archivosServicio.obtenerArchivos(usuario.id);
            setArchivos(datos.archivos);
        } catch (err) {
            setError('Error al cargar archivos.');
        }
    }, [usuario.id]);

    useEffect(() => {
        cargarArchivos();
    }, [cargarArchivos]);

    const manejarSubida = async (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;

        try {
            await archivosServicio.subirArchivo(usuario.id, archivo);
            cargarArchivos();
        } catch (err) {
            setError('Error al subir el archivo.');
        }
    };

    const manejarEditar = (archivo) => {
        setIdEditando(archivo.id);
        setNombreEditar(archivo.nombre);
    };

    const manejarGuardarNombre = async (id) => {
        try {
            await archivosServicio.actualizarArchivo(id, nombreEditar);
            setIdEditando(null);
            setNombreEditar('');
            cargarArchivos();
        } catch (err) {
            setError('Error al renombrar el archivo.');
        }
    };

    const manejarEliminar = async (id) => {
        if (window.confirm('¿Eliminar este archivo?')) {
            try {
                await archivosServicio.eliminarArchivo(id);
                cargarArchivos();
            } catch (err) {
                setError('Error al eliminar el archivo.');
            }
        }
    };

    const formatearTamano = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div className="drive-contenedor">
            <div className="drive-encabezado">
                <h2>Mi Drive</h2>
                <button className="boton-subir">
                    Subir archivo
                    <input
                        type="file"
                        onChange={manejarSubida}
                        style={{ display: 'none' }}
                    />
                </button>
            </div>

            {error && <p className="error">{error}</p>}

            {archivos.length === 0 ? (
                <p className="sin-archivos">No hay archivos</p>
            ) : (
                <table className="tabla-archivos">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Extensión</th>
                            <th>Tamaño</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {archivos.map((archivo) => (
                            <tr key={archivo.id}>
                                <td>
                                    {idEditando === archivo.id ? (
                                        <input
                                            type="text"
                                            value={nombreEditar}
                                            onChange={(e) => setNombreEditar(e.target.value)}
                                            className="input-editar-nombre"
                                        />
                                    ) : (
                                        archivo.nombre
                                    )}
                                </td>
                                <td>{archivo.extension}</td>
                                <td>{formatearTamano(archivo.tamano)}</td>
                                <td>
                                    {idEditando === archivo.id ? (
                                        <>
                                            <button onClick={() => manejarGuardarNombre(archivo.id)} className="boton-guardar">
                                                Guardar
                                            </button>
                                            <button onClick={() => setIdEditando(null)} className="boton-cancelar">
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => manejarEditar(archivo)} className="boton-editar">
                                                Editar
                                            </button>
                                            <button onClick={() => manejarEliminar(archivo.id)} className="boton-eliminar">
                                                Eliminar
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Drive;