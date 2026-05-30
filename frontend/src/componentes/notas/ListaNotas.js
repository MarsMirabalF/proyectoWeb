import { useState, useEffect, useCallback } from 'react';
import notasServicio from '../../servicios/notasServicio';
import FormularioNota from './FormularioNota';
import TarjetaNota from './TarjetaNota';

function ListaNotas({ usuario }) {

    const [notas, setNotas] = useState([]);
    const [error, setError] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [notaEditar, setNotaEditar] = useState(null);

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

    const abrirFormularioNuevo = () => {
        setMostrarFormulario(true);
    };

    const abrirFormularioEditar = (nota) => {
        setNotaEditar(nota);
        setMostrarFormulario(true);
    };

    const alGuardar = () => {
        setMostrarFormulario(false);
        setNotaEditar(null);
        cargarNotas();
    };

    const alCancelar = () => {
        setMostrarFormulario(false);
        setNotaEditar(null); 
    };

    return (
        <div className="lista-notas-contenedor">

            {error && (
                <p className="error">{error}</p>
            )}

            {mostrarFormulario ? (
                <FormularioNota
                    usuarioId={usuario.id}
                    notaEditar={notaEditar}
                    alGuardar={alGuardar}
                    alCancelar={alCancelar}
                />
            ) : (
                <>
                <div className="lista-encabezado">
                    <h2>Mis notas</h2>
                    <button onClick={abrirFormularioNuevo} className="boton-nueva-nota">
                        Nueva nota
                    </button>
                </div>

            {notas.length === 0 ? (
                <p>No hay notas.</p>
            ) : (
                <div className="lista-notas">

                    {notas.map((nota) => (
                        <div key={nota.id} className="nota-simple">

                            <TarjetaNota
                                    key={nota.id}
                                    nota={nota}
                                    alActualizar={cargarNotas}
                                    alEditar={abrirFormularioEditar}
                            />

                        </div>
                    ))}

                </div>
            )}
            </>
            )}
        </div>
    );
}

export default ListaNotas;