import { useState } from 'react';

function FormularioNota({ usuarioId, alGuardar, alCancelar }) {
    const [titulo, setTitulo] = useState('');
    const [detalle, setDetalle] = useState('');
    const [error, setError] = useState('');

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');

        try {
            console.log({ usuarioId, titulo, detalle });
            alGuardar();
        } catch (err) {
            setError('Error al guardar la nota.');
        }
    };

    return (
        <div className="formulario-contenedor">
            <h2>Nueva nota</h2>

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
                        Crear nota
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