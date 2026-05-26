function Encabezado({ usuario, alCerrarSesion }) {
    return (
        <header className="encabezado">
            <h1>Lista de Notas</h1>
            <div className="encabezado-usuario">
                <span>Usuario ID: {usuario.id}</span>
                <button onClick={alCerrarSesion} className="boton-logout">
                    Salir
                </button>
            </div>
        </header>
    );
}

export default Encabezado;