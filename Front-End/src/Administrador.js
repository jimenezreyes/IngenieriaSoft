import React from 'react';
import './Administrador.css';
import { useNavigate } from 'react-router-dom';
import CRUDTorneo from './CRUDTorneo';

function Administrador() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className='Administrador'>
            <h1>¡Bienvenido Administrador!</h1>
            <CRUDTorneo />
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default Administrador;