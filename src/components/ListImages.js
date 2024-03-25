import React from "react";

function ListImages({ images }) {
  return (
    <>
      {images.length > 0 ? (
        images.map((image, index) => (
          <div key={index} className="image-wrapper">
            <img
              src={image.urls.regular}
              alt={`Imagen ${index}`}
              className="image"
            />
          </div>
        ))
      ) : (
        <p>Cargando imágenes...</p>
      )}
    </>
  );
}

export default ListImages;
