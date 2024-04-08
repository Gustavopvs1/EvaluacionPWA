import React, { useState, useEffect } from "react";
import axios from "axios";
import ListImages from "../components/ListImages";
import "./Home.css"

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const accessKey = "bQuu4Cl1wW3kgLiTUKmBkRecQuesC31H0wEp8AjPdHg";
        const count = 5;
        const response = await axios.get(
          `https://api.unsplash.com/photos/random?count=${count}&client_id=${accessKey}`
        );
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="image-container">
      {loading ? <p>Loading images...</p> : <ListImages images={images} />}
    </div>
  );
};

export default Home;
