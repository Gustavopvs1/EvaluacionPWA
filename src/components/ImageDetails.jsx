import React, { useContext, useState, useEffect, useMemo, memo } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";
import "./ImageDetails.css";
import {
  collection,
  doc,
  getFirestore,
  arrayUnion,
  arrayRemove,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { UserContext } from "../customHooks/UserContext";
import { CloseButton, Form } from "react-bootstrap";

const ImageDetails = memo(({ id, srcImage, show, onHide }) => {
  const { user } = useContext(UserContext);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        if (!user || !id) return;
        const db = getFirestore();
        const userId = user.uid;
        const imagesRef = doc(collection(db, "images"), userId);
        const docSnapshot = await getDoc(imagesRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const savedData = data.saved || [];
          const isImageSaved = savedData.some((item) => item.id === id);
          setIsSaved(isImageSaved);
        }
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };
    checkSavedStatus();
  }, [user, id]);

  const toggleSave = useMemo(
    () =>
      async () => {
        try {
          if (!user || !id || !srcImage) return;
          const db = getFirestore();
          const userId = user.uid;
          const imagesRef = doc(collection(db, "images"), userId);
          const imageData = { url: srcImage, id };
          if (isSaved) {
            await updateDoc(imagesRef, { saved: arrayRemove(imageData) });
            setIsSaved(false);
          } else {
            await updateDoc(imagesRef, { saved: arrayUnion(imageData) });
            setIsSaved(true);
          }
        } catch (error) {
          console.error("Error toggling save:", error);
        }
      },
    [user, id, srcImage, isSaved]
  );

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Container>
          <CloseButton onClick={onHide} className="close-button" />
          <Row className="image-row">
            <Col xs={9}>
              {srcImage && id ? (
                <div className="image-wrapper">
                  <img src={srcImage} className="image" alt="Image Details" />
                </div>
              ) : (
                <p>Loading image...</p>
              )}
            </Col>
            <Col xs={3}>
              {isSaved ? (
                <BookmarkHeartFill onClick={toggleSave} className="bookmark-icon" />
              ) : (
                <BookmarkHeart onClick={toggleSave} className="bookmark-icon" />
              )}
              <Form.Select aria-label="Add to library" className="select-library">
                <option>Add to library</option>
                {/* Add library options here */}
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
});

export default ImageDetails;