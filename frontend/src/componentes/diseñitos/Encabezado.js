function Encabezado({ usuario, alCerrarSesion }) {
    return (
        <header className="encabezado">
            <h1>Las dos utilidades que ofrece mi Web son: </h1>
            <div className="encabezado-usuario">
                <button onClick={alCerrarSesion} className="boton-logout">
                    Salir
                </button>
            </div>
        </header>
    );
}

export default Encabezado;