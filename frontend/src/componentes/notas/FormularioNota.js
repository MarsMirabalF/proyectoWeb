import { useState } from 'react';
import { useEffect } from 'react';
import notasServicio from '../../servicios/notasServicio';

function FormularioNota({ usuarioId, notaEditar ,alGuardar , alCancelar }) {
    const [titulo, setTitulo] = useState('');
    const [detalle, setDetalle] = useState('');
    const [hora, setHora] = useState('');
    const [fecha, setFecha] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (notaEditar) {
            setTitulo(notaEditar.titulo);
            setDetalle(notaEditar.detalle);
            setHora(notaEditar.hora);
            setFecha(notaEditar.fecha?.split('T')[0]);
        } else {
            setTitulo('');
            setDetalle('');
            setHora('');
            setFecha('');
        }
    }, [notaEditar]);

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (notaEditar) {
                await notasServicio.actualizarNota(notaEditar.id, {
                    titulo, detalle, hora, fecha
                });
            } else {
                await notasServicio.crearNota({
                    usuario_id: usuarioId,
                    titulo, detalle, hora, fecha
                });
            }
            alGuardar();
        } catch (err) {
            setError('Error al guardar la nota.');
        }
    };

    return (
        <div className="formulario-contenedor">
            <h2>{notaEditar ? 'Editar nota' : 'Nueva nota'}</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={manejarEnvio}>
                <div className="campo">
                    <label>Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label>Detalle</label>
                    <textarea
                        value={detalle}
                        onChange={(e) => setDetalle(e.target.value)}
                        rows={5}
                    />
                </div>

                <div className="campo">
                    <label>Hora</label>
                    <input
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label>Fecha</label>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="botones-formulario">
                    <button type="submit">
                        {notaEditar ? 'Guardar cambios' : 'Crear nota'}
                    </button>
                    <button type="button" onClick={alCancelar} className="boton-cancelar">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormularioNota;