import React from 'react';
import './Superadmin.css';
import { useNavigate } from 'react-router-dom';

function Superadmin() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div>
            <h1>¡Bienvenido Superadministrador!</h1>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default Superadmin;