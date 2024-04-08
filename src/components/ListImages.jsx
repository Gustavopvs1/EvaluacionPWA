import React, { useState, useContext } from "react";
import ImageDetails from "./ImageDetails";
import { toast } from "react-toastify";
import { UserContext } from "../customHooks/UserContext";
import "./UserLibrary.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';


function ListImages({ images }) {
  const { user } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [srcImage, setSrcImage] = useState(null);

  const goToImageDetail = (id, src) => {
    if (!handleUnregisteredUsers()) return;
    setImageId(id);
    setSrcImage(src);
    setModalShow(true);
  };

  const handleUnregisteredUsers = () => {
    if (!user) {
      toast.error("You must sign in to view image details.");
      return false;
    }
    return true;
  };

  return (
    <>
      {images.length > 0 ? (
        images.map((image, index) => (
          <div key={index} className="image-wrapper">
            <LazyLoadImage
              loading="lazy"
              src={image.urls.regular}
              alt={image.alt_description || "Image from Unsplash"}
              className="image"
              onClick={() => goToImageDetail(image.id, image.urls.regular)}
            />
          </div>
        ))
      ) : (
        <p>Loading images...</p>
      )}

      <ImageDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={imageId}
        srcImage={srcImage}
      />
    </>
  );
}

export default ListImages;
