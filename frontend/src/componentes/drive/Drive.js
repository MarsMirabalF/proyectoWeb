import { useState, useEffect, useCallback, useRef } from 'react';
import archivosServicio from '../../servicios/archivosServicio';

function Drive({ usuario }) {
    const [archivos, setArchivos] = useState([]);
    const [error, setError] = useState('');
    const [nombreEditar, setNombreEditar] = useState('');
    const [idEditando, setIdEditando] = useState(null);

    const cargarArchivos = useCallback(async () => {
        try {
            const datos = await archivosServicio.obtenerArchivos();
            setArchivos(datos.archivos);
        } catch (err) {
            setError('Error al cargar archivos.');
        }
    }, []);

    useEffect(() => {
        cargarArchivos();
    }, [cargarArchivos]);

    const manejarSubida = async (e) => {
        const archivo = e.target.files[0];
        if (!archivo) {
            return;
        }

        try {
            await archivosServicio.subirArchivo(archivo);
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

    const manejarDescarga = async (archivo) => {
        try {
            await archivosServicio.descargarArchivo(archivo.id, archivo.nombre);
        } catch (err) {
            setError('Error al descargar el archivo.');
        }
    };

    const inputArchivoRef = useRef(null);

    const abrirSelectorArchivo = () => {
        inputArchivoRef.current.click();
    };

    return (
        <div className="drive-contenedor">
            <div className="drive-encabezado">
                <h2>Mi Drive</h2>
                    <input
                        ref={inputArchivoRef}
                        type="file"
                        onChange={manejarSubida}
                        style={{ display: 'none' }}
                    />

                    <button
                        onClick={abrirSelectorArchivo}
                        className="boton-subir"
                    >
                        Subir archivo
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
                                <td>{archivo.tamano} bytes</td>
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
                                            <button onClick={() => manejarDescarga(archivo)} className="boton-descargar">
                                                Descargar
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