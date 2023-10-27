import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Contraseña:', password);


    const res = await fetch(`http://127.0.0.1:5000/login`,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({email, password})
    });
    const data = await res.json();
    console.log(data);
  };

  const navigate = useNavigate();

  const handleRegistrar = () => {
    navigate('/registrar');
  };

  return (
    <div className="Login">
      <h1>Iniciar Sesión</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Nombre de Usuario:</label>
          <input
            type="text"
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