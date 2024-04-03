import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import './Perfil.css';

const Perfil = () => {
    const [userData, setUserData] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchUserData = async () => {
            // Acceder al usuario actualmente autenticado
            const user = auth.currentUser;

            if (user) {
                // Obtener la información del usuario (correo electrónico y nombre)
                const { email, displayName, photoURL } = user;
                // Actualizar el estado con la información del usuario
                setUserData({ email, displayName, photoURL });
                // Guardar los datos del usuario en el almacenamiento local (local storage)
                localStorage.setItem('userData', JSON.stringify({ email, displayName, photoURL }));
            } else {
                // Si el usuario no está autenticado, intentar obtener los datos del almacenamiento local
                const storedUserData = localStorage.getItem('userData');
                if (storedUserData) {
                    // Si se encuentran datos en el almacenamiento local, actualizar el estado con esos datos
                    setUserData(JSON.parse(storedUserData));
                }
            }
        };

        fetchUserData(); 
    }, []); 
    
    const handleEditProfile = () => {
        
        navigate("/editarperfil");
    };

    return (
        <div className="perfil-container">
            {userData ? ( // Verificar si se encontraron datos del usuario
                <div>
                    <h1 className="perfil-title">Perfil</h1>
                    <div className="perfil-info">
                        <img src={userData.photoURL} alt="Foto de perfil" className="perfil-photo" />
                        <div className="perfil-section">
                            <h3>Correo electrónico:</h3>
                            <p>{userData.email}</p>
                        </div>
                        <div className="perfil-section">
                            <h3>Nombre:</h3>
                            <p>{userData.displayName}</p>
                            <button className="edit-profile-button" onClick={handleEditProfile}>Editar perfil</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1 className="perfil-title">Perfil</h1>
                    <p className="login-message">Inicia sesión para mejorar tu experiencia</p>
                </div>
            )}
        </div>
    );
};

export default Perfil;
