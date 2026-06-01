import { useState } from 'react';
import authServicio from '../../servicios/authServicio';

function Registro({ alIniciarSesion }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    const manejarRegistro = async (e) => {
        e.preventDefault();
        setError('');
        setMensaje('');
        setCargando(true);

        try {
            await authServicio.registrar(username, password);
            setMensaje('Registro exitoso. Ya puedes iniciar sesión.');
            setUsername('');
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.mensaje || 'Error al registrarse.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="formulario-contenedor">
            <h1>Mi proyecto que me costo muuuucho tiempo :D</h1>
            <h2>Crear cuenta</h2>

            {error && <p className="error">{error}</p>}
            {mensaje && <p className="exito">{mensaje}</p>}

            <form onSubmit={manejarRegistro}>
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
                    {cargando ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>

            <p>
                <button className="enlace" onClick={alIniciarSesion}>
                    Inicia sesión
                </button>
            </p>
        </div>
    );
}

export default Registro;