import React from 'react';
import './Administrador.css';
import { useNavigate } from 'react-router-dom';

function Administrador() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div>
            <h1>¡Bienvenido Administrador!</h1>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default Administrador;