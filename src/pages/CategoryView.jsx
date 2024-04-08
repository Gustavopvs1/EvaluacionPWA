import React, { useContext, useEffect, useState, useCallback } from "react";
import ListImages from "../components/ListImages";
import "./CategoryView.css";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { UserContext } from "../customHooks/UserContext";
import axios from "axios";

function CategoryView({ categorySelected }) {
  const { user } = useContext(UserContext);
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState([]);

  const getFavorites = async () => {
    try {
      const db = getFirestore();
      const userId = user.uid;
      const imagesRef = doc(collection(db, "images"), userId);
      const docSnapshot = await getDoc(imagesRef);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const selectedCategoryData = userData[categorySelected] || [];
        setImages(selectedCategoryData);
      }
    } catch (error) {
      console.error("Error checking saved status", error);
    }
  };

  const fetchImages = useCallback(async () => {
    const urls = await Promise.all(
      images.map(async (image) => {
        const response = await axios.get(
          `https://api.unsplash.com/photos/${image.id}?client_id=bQuu4Cl1wW3kgLiTUKmBkRecQuesC31H0wEp8AjPdHg`
        );
        return response.data;
      })
    );
    setImageData(urls);
  }, [images]);

  useEffect(() => {
    getFavorites();
  }, [categorySelected]);

  useEffect(() => {
    fetchImages();
  }, [images]);

  console.log("CategoryView images", imageData);

  return (
    <>
      <h3 className="uppercase">{categorySelected}</h3>
      <div className="image-container">
        <ListImages images={imageData} />
      </div>
    </>
  );
}

export default CategoryView;
