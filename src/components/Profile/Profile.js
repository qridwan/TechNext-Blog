import React from "react";
import { useContext } from "react";
import { Col } from "react-bootstrap";
import { Card, Row } from "react-bootstrap";
import { UserContext } from "../../App";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import PopupCard from "./PopupCard";

const Profile = () => {
  const [allPost] = useContext(UserContext);
  const myPost = allPost.filter((post) => post.userId === 2);
  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then(() => alert("Successfully Deleted"));
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handlePopup = () => {
    openModal();
  };
  return (
    <div className="">
      <h2 className="text-center mb-4 fw-bolder"> My Blogs </h2>
      <Row>
        {myPost.map((post, index) => (
          <Col key={index} md={3} className="mb-3">
            <Card border="light" style={{ width: "18rem" }}>
              <Card.Header className="fw-bold">
                User: {post.userId}
                <IconButton onClick={handlePopup} title="Edit">
                  <EditIcon className="text-primary" />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(post.id)}
                  title="Delete Blog"
                >
                  <DeleteIcon className="text-danger" />
                </IconButton>
              </Card.Header>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>{" "}
            <PopupCard post={post} modalIsOpen={modalIsOpen} closeModal={closeModal} />
          </Col>
          
        ))}
    
      </Row>
      
    </div>
  );
};

export default Profile;
