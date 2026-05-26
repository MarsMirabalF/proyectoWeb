import { useState, useEffect, useCallback } from 'react';
import notasServicio from '../../servicios/notasServicio';

function ListaNotas({ usuario }) {

    const [notas, setNotas] = useState([]);
    const [error, setError] = useState('');

    const cargarNotas = useCallback(async () => {
        try {
            const datos = await notasServicio.obtenerNotas(usuario.id);
            setNotas(datos.notas);
        } catch (err) {
            setError('Error al cargar las notas.');
        }
    }, [usuario.id]);

    useEffect(() => {
        cargarNotas();
    }, [cargarNotas]);

    return (
        <div className="lista-notas-contenedor">

            {error && (
                <p className="error">{error}</p>
            )}

            <h2>Mis notas</h2>

            {notas.length === 0 ? (
                <p>No hay notas.</p>
            ) : (
                <div className="lista-notas">

                    {notas.map((nota) => (
                        <div key={nota.id} className="nota-simple">

                            <h3>{nota.titulo}</h3>

                            {nota.detalle && (
                                <p>{nota.detalle}</p>
                            )}

                            <p>
                                Estado: {nota.completada ? 'Completada' : 'Pendiente'}
                            </p>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default ListaNotas;