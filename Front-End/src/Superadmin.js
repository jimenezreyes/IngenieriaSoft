import React from 'react';
import './Superadmin.css';
import { useNavigate } from 'react-router-dom';
import CRUDAdmin from './CRUDAdmin';

function Superadmin() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div>
            <h1>¡Hola, superadmin!</h1>
            <CRUDAdmin />
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default Superadmin;