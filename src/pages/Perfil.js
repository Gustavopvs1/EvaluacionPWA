import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import './Perfil.css';

const Perfil = () => {
    const [userData, setUserData] = useState(null);
    const [savedImages, setSavedImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;

            if (user) {
                const { email, displayName, photoURL } = user;
                setUserData({ email, displayName, photoURL });
                localStorage.setItem('userData', JSON.stringify({ email, displayName, photoURL }));

               
                const userImagesRef = firestore.collection('users').doc(user.uid).collection('savedImages');
                const snapshot = await userImagesRef.get();
                const images = snapshot.docs.map(doc => doc.data());
                setSavedImages(images);
            } else {
                const storedUserData = localStorage.getItem('userData');
                if (storedUserData) {
                    setUserData(JSON.parse(storedUserData));
                }
            }
        };

        fetchUserData();
    }, []);

    const handleEditProfile = () => {
        navigate('/editarperfil');
    };

    return (
        <div className="perfil-container">
            {userData ? (
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
                    <div className="saved-images">
                        <h3>Imágenes guardadas:</h3>
                        {savedImages.map((image, index) => (
                            <img key={index} src={image.url} alt={`Imagen guardada ${index}`} className="saved-image" />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h1 className="perfil-title">No has iniciado sesión</h1>
                    <p className="login-message">Inicia sesión para mejorar tu experiencia</p>
                </div>
            )}
        </div>
    );
};

export default Perfil;
