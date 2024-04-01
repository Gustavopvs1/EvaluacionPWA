import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { ArrowBarLeft } from "react-bootstrap-icons";
import {
  collection,
  doc,
  setDoc,
  getFirestore,
  arrayUnion,
  arrayRemove,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { UserContext } from "../customHooks/UserContext";

function ImageDetails({ srcImage, show, onHide }) {
  const user = useContext(UserContext);
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    // Check if the image is already saved when the component mounts
    const checkSavedStatus = async () => {
      try {
        const db = getFirestore();
        const userId = user.uid;
        const imagesRef = doc(collection(db, "images"), userId);
        console.log("imagesRef", imagesRef);
        const docSnapshot = await getDoc(imagesRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          if (data.saved && data.saved.includes(srcImage)) {
            console.log("checkSavedStatus: Image is already saved");
            setIsSaved(true);
          }
        }
      } catch (error) {
        console.log("Error checking saved status", error);
      }
    };

    checkSavedStatus();
  }, [srcImage]);
  const toggleSave = async () => {
    console.log("Toggle save");
    try {
      const db = getFirestore();
      const userId = user.uid;
      const imagesRef = collection(db, "images");

      if (isSaved) {
        // Remove the image URL from "saved" category
        await updateDoc(doc(imagesRef, userId), {
          saved: arrayRemove(srcImage),
        });
        setIsSaved(false);
      } else {
        // Add the image URL to "saved" category
        await setDoc(
          doc(imagesRef, userId),
          { saved: arrayUnion(srcImage) },
          { merge: true }
        );
        setIsSaved(true);
      }
    } catch (error) {
      console.log("Error toggling save", error);
    }
  };
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="grid-example">
          <Container>
            <Row>
              <Col xs={12} md={8}>
                {srcImage ? (
                  <div className="image-wrapper">
                    <Button variant="secondary" onClick={onHide}>
                      <ArrowBarLeft className="ml-4" />
                    </Button>
                    <br />
                    <img
                      src={srcImage}
                      alt={`Imagen`}
                      className="image"
                      download="image.jpg" // Add this line
                    />
                  </div>
                ) : (
                  "cargando imagen "
                )}
              </Col>
              <Col xs={6} md={4}>
                {
                  <h3>
                    {isSaved ? (
                      <Button variant="danger" onClick={toggleSave}>
                        Remove from saved
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={toggleSave}>
                        Save
                      </Button>
                    )}
                  </h3>
                }

                <br />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ImageDetails;
