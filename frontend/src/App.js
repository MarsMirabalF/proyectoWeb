import { useState } from 'react';
import EntradaUsuario from './componentes/autenticacion/EntradaUsuario';
import ListaNotas from './componentes/notas/ListaNotas';
import Encabezado from './componentes/diseñitos/Encabezado';
import './App.css';

function App() {

    const [usuario, setUsuario] = useState(null);

    const alEntrar = (idUsuario) => {
        setUsuario({ id: idUsuario });
    };

    const alSalir = () => {
        setUsuario(null);
    };

    if (usuario) {
        return (
            <div className="app">
                <Encabezado
                    usuario={usuario}
                    alCerrarSesion={alSalir}
                />
                <main className="contenido-principal">
                    <ListaNotas usuario={usuario} />
                </main>
            </div>
        );
    }

    return (
        <div className="App">
            <main className="contenido-principal centrado">
                <EntradaUsuario alEntrar={alEntrar} />
            </main>
        </div>
    );
}

export default App;
