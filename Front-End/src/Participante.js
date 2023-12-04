import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import './Participante.css';
import { useNavigate } from 'react-router-dom';
import VistaTorneos from './VistaTorneos';
import Login from './Login';
import DancingCat from './DancingCat';

function Participante() {
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

    if (localStorage.getItem('tipo_usuario') !== 'participante') {
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
      <div className="Participante">
       <h1>¡Hola, participante!</h1>
        Estos son los torneos disponibles:
        <VistaTorneos />
          <FormGroup>
            <Button style={{ width: '200px' }} color = 'primary' onClick={handleLogout} >
              Cerrar Sesión
            </Button>
          </FormGroup>
      </div>
    );
}

export default Participante;