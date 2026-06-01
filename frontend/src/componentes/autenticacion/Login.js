import { useState } from 'react';
import authServicio from '../../servicios/authServicio';

function Login({ alLoginExitoso, alRegistrarse }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const manejarLogin = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            const datos = await authServicio.iniciarSesion(username, password);
            alLoginExitoso(datos.usuario, datos.token);
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Error al iniciar sesión.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="formulario-contenedor">
            <h1>Mi proyecto que me costo muuuucho tiempo :D</h1>
            <h2>Iniciar sesión</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={manejarLogin}>
                <div className="campo">
                    <label>Usuario</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingresa tu usuario"
                        required
                    />
                </div>

                <div className="campo">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>

                <button type="submit" disabled={cargando}>
                    {cargando ? 'Ingresando...' : 'Iniciar sesión'}
                </button>
            </form>

            <p>
                <button className="enlace" onClick={alRegistrarse}>
                    Registrarse
                </button>
            </p>
        </div>
    );
}

export default Login;