import { useState, useEffect, useCallback } from 'react';
import notasServicio from '../../servicios/notasServicio';
import FormularioNota from './FormularioNota';
import TarjetaNota from './TarjetaNota';

function ListaNotas({ usuario }) {

    const [notas, setNotas] = useState([]);
    const [error, setError] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [notaEditar, setNotaEditar] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const limite = 2;


    const cargarNotas = useCallback(async () => {
        try {
            const datos = await notasServicio.obtenerNotas(paginaActual , limite);
            if (datos !== null) {
                setNotas(datos.notas);
                setTotalPaginas(datos.paginacion.totalPaginas);
            }
        } catch (err) {
            setError('Error al cargar las notas D:');
        }
    }, [paginaActual]);

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

                            <br />

                    {totalPaginas > 1 && (
                        <div className="paginacion">
                            <button
                                onClick={() => setPaginaActual(p => p - 1)}
                                disabled={paginaActual === 1}
                                className="boton-pagina"
                            >
                                Atrasito
                            </button>

                            <span>{paginaActual}   /{totalPaginas}</span>

                            <button
                                onClick={() => setPaginaActual(p => p + 1)}
                                disabled={paginaActual === totalPaginas}
                                className="boton-pagina"
                            >
                                Adelantecito
                            </button>
                        </div>
                    )}
            </>
            )}
        </div>
    );
}

export default ListaNotas;