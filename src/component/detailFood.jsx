import React, { useEffect, useState } from "react";
import "./component.css";
import { Container, Row, Col, Button,  } from "react-bootstrap";
import { getRating } from "./api";
import { detailFood } from "./api";
import {  useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-rating-stars-component";
import Rate from "./createRating";
import RatingView from "./rating";


function DetailFood() {
  const [detFood, setDetFood] = useState([]);
  const [ratingFood, setRatingFood] = useState([]);
  let { id } = useParams();

  const stars = detFood.rating;
useEffect(() => {
  detailFood(id).then((result) => {
    setDetFood(result);
  });

  getRating(id).then((respon) => setRatingFood(respon));
}, []);

return (
  <section className="font detail p-4">
    <Container fluid>
      <Row className="justify-content-center bg-light">
        <Col md={5} sm={6} xs={6} className="detail-img p-4 d-flex align-items-center justify-content-center rounded-start">
          <div className="text-center img-detail">
            <img src={detFood.imageUrl} className="img-fluid rounded-4 rotate-6" alt={detFood.name} />
          </div>
        </Col>
        <Col md={5} sm={6} xs={6} className="p-4 rounded-end bg-white">
          <div>
            <h2 className="fw-bold fs-1">{detFood.name}</h2>
            <div className="d-flex">
              <p className="">
                Likes <FontAwesomeIcon icon={faHeart} className="text-danger me-1" />
                {detFood.totalLikes}
              </p>
              <p className="ms-1 me-1">|</p>
              <p>rating</p>
              <ReactStars name="rating" value={stars} size={19} isHalf={true} edit={false} classNames="text-warning" />
              <p>{detFood.rating}</p>
            </div>
            <h5 className="fw-semibold">Description : </h5>
            <p>{detFood.description}</p>
            <div>
              <h5>inggridient :</h5>
              <ul></ul>
            </div>
            <Rate idFood={id} />
          </div>
        </Col>
      </Row>
      <Row className="p-2 justify-content-center">
        <h2 className="fw-bolder color text-center">Rating</h2>
        {ratingFood.map((e, i) => {
          return (
            <Col lg={3} key={i}>
              <div>
                <img src={e.user.profilePictureUrl} alt={e.user.name} className="img-fluid img-rating rounded-circle me-2" />
                <span>{e.user.name}</span>
              </div>
              <div>
                <span className="fs-6">
                  <RatingView rate={e.rating} />
                </span>
              </div>
              <div>
                <p>{e.review}</p>
              </div>
              <hr />
            </Col>
          );
        })}
      </Row>
    </Container>
    
  </section>
);
}
export default DetailFood;
