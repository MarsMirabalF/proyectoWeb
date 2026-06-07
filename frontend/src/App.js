import { useState } from 'react';
import axios from 'axios';
import Login from './componentes/autenticacion/Login';
import Registro from './componentes/autenticacion/Registro';
import ListaNotas from './componentes/notas/ListaNotas';
import Encabezado from './componentes/diseñitos/Encabezado';
import Drive from './componentes/drive/Drive';

function App() {

    const [usuario, setUsuario] = useState(null);
    const [mostrarRegistro, setMostrarRegistro] = useState(false);

    const alLoginExitoso = (datosUsuario, tokenRecibido) => {
        setUsuario(datosUsuario);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${tokenRecibido}`;
    };

    const alSalir = () => {
        setUsuario(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    if (usuario) {
        return (
            <div className="app">
                <Encabezado usuario={usuario} alCerrarSesion={alSalir} />
                <main className="pantalla-dividida">
                    <div className="panel-izquierdo">
                        <ListaNotas usuario={usuario} />
                    </div>
                    <div className="divisor"></div>
                    <div className="panel-derecho">
                        <Drive usuario={usuario} />
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="App">
            <main className="contenido-principal centrado">
                {mostrarRegistro ? (
                    <Registro alIniciarSesion={() => setMostrarRegistro(false)} />
                ) : (
                    <Login
                        alLoginExitoso={alLoginExitoso}
                        alRegistrarse={() => setMostrarRegistro(true)}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
