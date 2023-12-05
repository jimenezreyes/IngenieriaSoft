import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerPerfil.css"


function VerPerfil(){
    const [perfilData, setPerfilData] = useState({
        idParticipante: '',
        nombre: localStorage.getItem('nombre'),
        apellido: localStorage.getItem('apellido'),
        correo: localStorage.getItem('email'),
        contrasena: '',
        gamertag: localStorage.getItem('gamertag'),
        foto: null,
      });
    
    const navigate = useNavigate();

    function handleRegresar(){
        navigate("/participante");
    }

    return <div className="containerVerPerfil">
        <h1>¡Hola, {perfilData.nombre}!</h1>
        <p>{perfilData.correo}</p>
        <h3>&#64;{perfilData.gamertag}</h3>

        <img src="MMT.png" alt="logo"/>

        <button className="buttonVerPerfil" onClick={handleRegresar}>Regresar a vista de participante</button>
    </div>
}

export default VerPerfil;