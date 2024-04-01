import React, { useState, useContext } from "react";
import ImageDetails from "./ImageDetails";
import { toast } from "react-toastify";
import { UserContext } from "../customHooks/UserContext";
function ListImages({ images }) {
  const user = useContext(UserContext);

  const [modalShow, setModalShow] = useState(false);
  const [srcImage, setSrcImage] = useState(null);

  const goToImageDetail = (src) => {
    if (!handleUnregisteredUsers()) return;
    setSrcImage(src);
    setModalShow(true);
  };

  const handleUnregisteredUsers = () => {
    console.log(user);
    if (!user) {
      toast.error("Debes iniciar sesión para ver los detalles de la imagen");
      return false;
    }
    return true;
  };
  return (
    <>
      {images.length > 0 ? (
        images.map((image, index) => (
          <div key={index} className="image-wrapper">
            <img
              src={image.urls.regular}
              alt={`Imagen ${index}`}
              className="image"
              onClick={() => goToImageDetail(image.urls.regular)}
            />
          </div>
        ))
      ) : (
        <p>Cargando imágenes...</p>
      )}

      <ImageDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        srcImage={srcImage}
      />
    </>
  );
}

export default ListImages;
