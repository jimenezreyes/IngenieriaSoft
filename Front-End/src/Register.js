import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleRegistro = async (e) => {
    e.preventDefault();

    // Aquí puedes enviar los datos al servidor para el registro
    const datosRegistro = {
      nombre,
      apellido,
      correo,
      password: contrasena,
    };

    console.log('Datos de registro:', datosRegistro);
    // Luego, puedes realizar una solicitud al servidor para manejar el registro.
    const res = await fetch(`http://127.0.0.1:5000/register`,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(datosRegistro)
    });
    const data = await res.json();
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <div className="registro">
      <h1>Registro</h1>      
      <form onSubmit={handleRegistro}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />

        <label htmlFor="correo">Correo:</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label htmlFor="contrasena">Contraseña:</label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <ul> 
          <li>
            <button onClick={handleRegistro}>Registrar</button>
          </li>   
          <li>
            <button onClick={handleClick}>Volver</button>
          </li>          
        </ul> 
      </form>
    </div>
  );
}

export default Register;