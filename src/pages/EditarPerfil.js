import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redireccionamiento
import './EditarPerfil.css'; // Importar archivo de estilos CSS

const EditarPerfil = () => {
    const [newDisplayName, setNewDisplayName] = useState(''); // Estado para almacenar el nuevo nombre del usuario
    const navigate = useNavigate(); // Obtener la función de navegación

    const handleChange = (e) => {
        setNewDisplayName(e.target.value); // Actualizar el estado con el valor del campo de entrada
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        // Guardar el nuevo nombre en el almacenamiento local
        localStorage.setItem('newDisplayName', newDisplayName);
        console.log('Nombre actualizado localmente:', newDisplayName);

        // Redirigir al usuario a la página de perfil
        navigate('/perfil');
    };

    return (
        <div className="editar-perfil-container">
            <h1>Editar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="displayName">Nuevo Nombre:</label>
                <input
                    type="text"
                    id="displayName"
                    value={newDisplayName}
                    onChange={handleChange}
                />
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarPerfil;
