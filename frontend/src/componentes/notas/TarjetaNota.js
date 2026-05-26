function TarjetaNota({ nota }) {
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
        </div>
    );
}

export default TarjetaNota;