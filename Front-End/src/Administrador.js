import React from 'react';
import './Administrador.css';
import { useNavigate } from 'react-router-dom';
import { FormGroup, Button } from 'reactstrap';
import CRUDTorneo from './CRUDTorneo';
import Login from './Login';
import DancingCat from './DancingCat';

function Administrador() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };
    
    const handleVolver = () => {
        navigate(-1); // Volver a la vista anterior
    };

    if (!localStorage.getItem('tipo_usuario')) {
        return <Login />
    }

    if (localStorage.getItem('tipo_usuario') !== 'administrador') {
        return (
          <div>
            <DancingCat />
            <p style={{ fontSize: '24px', textAlign: 'center', fontFamily: 'Georgia, serif' }}>
              No tienes permisos para ver esta página
            </p>
            <FormGroup className="text-center">
          <Button style={{ width: '200px' }} color="primary" onClick={handleVolver}>
            Volver
          </Button>
        </FormGroup>
          </div>
        );
    }    

    return (
        <div className='Administrador'>
            <h1>¡Hola, administrador!</h1>
            <CRUDTorneo />
            <FormGroup className="mb-3 text-center">
                <Button style={{ width: '200px' }} color="primary" onClick={handleLogout}>
                    Cerrar Sesión
                </Button>
            </FormGroup>
        </div>
    );
}

export default Administrador;