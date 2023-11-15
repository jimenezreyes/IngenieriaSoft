import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import "./Login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://127.0.0.1:5000/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.error === 'Ese correo no existe') {
        // Muestra la alerta para el correo no existente
        alert('Correo no existente');
      } else if (data.error === 'Contraseña incorrecta') {
        // Muestra la alerta para contraseña incorrecta
        alert('Contraseña incorrecta');
      } else if (data.error === 'Ninguno') {
        if (data.tipo_usuario === 'participante') {
          navigate('/participante');
        } else if (data.tipo_usuario === 'superadmin') {
          navigate('/superadmin');
        } else if (data.tipo_usuario === 'administrador') {
          navigate('/administrador');
        }
      }
    } catch (error) {
      // Error en la solicitud fetch
      console.error(error);
      alert('Error en el servidor, intenta más tarde');
    }
  };

  const handleRegistrar = () => {
    navigate('/registrar');
  };

  return (
    <div className="Login">
      <h1>Iniciar Sesión</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Dirección de email:</label>
          <input
            type="email"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <nav>
          <ul>
            <li>
              <button type="button" onClick={handleLogin}> Iniciar Sesión </button>
            </li>
            <li>
              <button type="button" onClick={handleRegistrar}>Registrar nuevo usuario</button>
            </li>
          </ul>
        </nav>
      </form>
    </div>
  );
}

export default Login;
