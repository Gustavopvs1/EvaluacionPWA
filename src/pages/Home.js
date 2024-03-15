import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [images, setImages] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú

    useEffect(() => {
        const accessKey = '73m9zE9ivuue_6Dl-i9sqsRUJGDdTGs9upcq3MNDf4I';
        const count = 15; // Cambia este valor según la cantidad de imágenes que desees mostrar

        axios.get(`https://api.unsplash.com/photos/random?count=${count}&client_id=${accessKey}`)
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error('Error al obtener imágenes de Unsplash:', error);
            });
    }, []);

    // Función para alternar la visibilidad del menú
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <h1 className='title'>Pinterestn't</h1>
            <button className="menu-button" onClick={toggleMenu}>
                <i className="material-icons">menu</i> {/* Aquí se encuentra el icono */}
            </button>
            {/* Menú plegable */}
            {menuOpen && (
                <div className="menu">
                    <ul>
                        <li><a href="#">Iniciar sesión</a></li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </div>
            )}
            <div className='image-container'>
                {images.map((image, index) => (
                    <div key={index} className='image-wrapper'>
                        <img src={image.urls.regular} alt={`Imagen ${index}`} className='image' />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
