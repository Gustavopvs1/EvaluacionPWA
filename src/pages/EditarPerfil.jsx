import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { UserContext } from "../customHooks/UserContext";
import { updateUserDisplayNameInDatabase } from "../firebase";

const EditarPerfil = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState("");

  const handleChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User is not defined");
      return;
    }

    try {
      // Actualizar el nombre en la base de datos
      await updateUserDisplayNameInDatabase(user.uid, newDisplayName);

      // Actualizar el nombre en el contexto de usuario si es necesario
      if (setUser) {
        setUser({ ...user, displayName: newDisplayName });
      }

      navigate("/perfil");
    } catch (error) {
      console.error("Error updating display name in database:", error);
    }
  };

  return (
    <div className="editar-perfil-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="displayName">New Name:</label>
        <input
          type="text"
          id="displayName"
          value={newDisplayName}
          onChange={handleChange}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default EditarPerfil;
