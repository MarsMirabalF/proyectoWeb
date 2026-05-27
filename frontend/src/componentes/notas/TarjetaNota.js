import notasServicio from '../../servicios/notasServicio';

function TarjetaNota({ nota,   alActualizar , alEditar }) {

    const manejarEstado = async () => {
        try {
            await notasServicio.cambiarEstado(nota.id);
            alActualizar();
        } catch (err) {
            console.error('Error al cambiar estado:', err);
        }
    };

    const manejarEliminar = async () => {
        if (window.confirm('¿Estás seguro de eliminar esta nota?')) {
            try {
                await notasServicio.eliminarNota(nota.id);
                alActualizar();
            } catch (err) {
                console.error('Error al eliminar nota:', err);
            }
        }
    };

    return (
        <div className={`tarjeta-nota ${nota.completada ? 'completada' : ''}`}>
            <div className="tarjeta-encabezado">
                <h3>{nota.titulo}</h3>
                <span className={`estado-badge ${nota.completada ? 'badge-completada' : 'badge-pendiente'}`}>
                    {nota.completada ? 'Completada' : 'Pendiente'}
                </span>
            </div>

            {nota.detalle && <p className="tarjeta-detalle">{nota.detalle}</p>}

            <div className="tarjeta-info">
                {nota.fecha && (
                    <span>{new Date(nota.fecha).toLocaleDateString('es-ES')}</span>
                )}
                {nota.hora && (
                    <span>{nota.hora}</span>
                )}
            </div>

            <div className="tarjeta-botones">
                <button onClick={manejarEstado} className="boton-estado">
                    {nota.completada ? 'Marcar pendiente' : 'Marcar completada'}
                </button>
                <button onClick={() => alEditar(nota)} className="boton-editar">
                    Editar
                </button>
                <button onClick={manejarEliminar} className="boton-eliminar">
                    Eliminar
                </button>
            </div>

        </div>
    );
}

export default TarjetaNota;