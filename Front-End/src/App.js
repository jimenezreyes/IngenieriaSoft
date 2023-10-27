import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import BottomBar from "./BottomBar";
import "./App.css";



function App() {
  return (  
    <div className = "App">         
        <Routes>
            <Route path="/" element={<Login />} />            
            <Route path="registrar" element={<Register />} />                    
        </Routes> 
        <BottomBar />      
    </div>  
  );
}

export default App;