import React, { useEffect, useState } from "react";
import "./component.css";
import { Container, Row, Col } from "react-bootstrap";
import { getRating } from "./api";
import { detailFood } from "./api";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import imgDefault from "./assets/img/potoDefault.png"
import Rate from "./createRating";
import RatingView from "./rating";
import Footer from "./footer";

function DetailFood() {
  const [detFood, setDetFood] = useState([]);
  const [ratingFood, setRatingFood] = useState([]);
  let { id } = useParams();

  const inggredients = detFood.ingredients ? detFood.ingredients : [];
  useEffect(() => {
    detailFood(id).then((result) => {
      setDetFood(result);
    });

    getRating(id).then((respon) => setRatingFood(respon));
  }, [id]);

  return (
    <section className="font bg-light">
      <Container fluid>
        <Row className="justify-content-center ">
          <Col xl={4} md={6} sm={8} className="detail-img p-4 d-flex align-items-center justify-content-center rounded-start">
            <div className="text-center">
              <img src={detFood.imageUrl} className="img-fluid rounded-4 rotate-6" alt={detFood.name} />
            </div>
          </Col>
          <Col xl={4} md={6} xs={11} className="p-4 rounded-end bg-white">
            <div>
              <h2 className="fw-bold fs-1">{detFood.name}</h2>
              <div className="d-flex">
                <p className="">
                  Likes <FontAwesomeIcon icon={faHeart} className="text-danger me-1" />
                  {detFood.totalLikes}
                </p>
                <p className="ms-1 me-1">|</p>
                <p>rating</p>
                <p>
                  <FontAwesomeIcon icon={faStar} className="text-warning ms-1 me-1" />
                  {detFood.rating}
                </p>
              </div>
              <h5 className="fw-semibold">Description : </h5>
              <p>{detFood.description}</p>
              <div>
                <h5>inggridient :</h5>
                <ul>
                  {inggredients.map((e, i) => {
                    return <li key={i}>{e}</li>;
                  })}
                </ul>
              </div>
              <Rate idFood={id} />
            </div>
          </Col>
        </Row>
        <Row className="p-2 justify-content-center gap-3">
          <h2 className="fw-bolder text-center">Rating</h2>
          {ratingFood.map((e, i) => {
            return (
              <Col lg={3} md={6} sm={8} key={i} className="p-3 rounded-4 kolom-review bg-white">
                <div className="mb-1">
                  <img src={e.user.profilePictureUrl ? e.user.profilePictureUrl : imgDefault} alt={e.user.name} className="img-fluid img-rating rounded-circle me-2" />
                  <span>{e.user.name}</span>
                </div>
                <RatingView rate={e.rating} size={16} />
                <p className="mt-1">{e.review}</p>
                <hr />
              </Col>
            );
          })}
        </Row>
      </Container>
      <Footer />
    </section>
  );
}
export default DetailFood;
