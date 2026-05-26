import { useState } from 'react';

function EntradaUsuario({ alEntrar }) {
    const [idUsuario, setIdUsuario] = useState('');
    const [error, setError] = useState('');

    const manejarEntrada = (e) => {
        e.preventDefault();
        setError('');

        if (!idUsuario || isNaN(idUsuario) || Number(idUsuario) <= 0) {
            setError('Ingresa un ID de usuario válido.');
            return;
        }

        alEntrar(Number(idUsuario));
    };

    return (
        <div className="entrada-contenedor">
            <h1>Lista de Notas</h1>

            {error && <p className="error">{error}</p>}

            <form onSubmit={manejarEntrada}>
                <div className="campo">
                    <label>ID de usuario </label>
                    <input
                        type="number"
                        value={idUsuario}
                        onChange={(e) => setIdUsuario(e.target.value)}
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default EntradaUsuario;