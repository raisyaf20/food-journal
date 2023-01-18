import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { userLikeFood } from "./api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import RatingView from "./rating";

const UserLikeFood = () => {
  const [foodsLike, setFoodsLike] = useState([]);
  useEffect(() => {
    userLikeFood().then((respon) => setFoodsLike(respon));
  }, []);

  return (
    <section className="font">
      <Container>
        <h1 className="text-center color">Favorite Food</h1>
        <Row className="justify-content-center gap-5 mt-4">
          {foodsLike.map((e, i) => {
            return (
              <Col key={i} lg={3} md={6} className="d-flex justify-content-center">
                <Card className="card-food d-flex justify-content-center align-items-center bg-page">
                  <div className="card-food-image">
                    <Card.Img variant="top" src={e.imageUrl} className="img-thumbnail" />
                  </div>
                  <Card.Body className="text-center ">
                    <Card.Title>
                      <h4 className="fw-bold">{e.name}</h4>
                    </Card.Title>
                    <Card.Text>{e.description}</Card.Text>
                    <div className="d-flex justify-content-center">
                      <div className="like">
                        <FontAwesomeIcon icon={faHeart} className="text-danger" />
                        <span className="ms-2 ">{e.totalLikes}</span>
                      </div>
                      <div className="rate">
                        <RatingView rate={e.rating} size={23} />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default UserLikeFood;
