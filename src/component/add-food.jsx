import React from "react";
import { Container, Form, Col, Row, Button, InputGroup } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Select from "react-select";
import { options } from "./admin/ingredients";
import { uploadImage } from "./api";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";

const AddFood = () => {
  const schema = yup.object({
    poto: yup
      .mixed()
      .required("You need to provide a file")
      .test("fileSize", "the file is top large", (value) => {
        return value && value[0].size <= 1000000;
      })
      .test("type", "not a picture", (value) => {
        return (
          value &&
          (value[0].type === "image/jpeg" ||
            value[0].type === "image/webp" ||
            value[0].type === "image/png" ||
            value[0].type === "application/jpg")
        );
      }),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const bahan = [];
    const ingre = data.bahan;
    ingre.forEach((e) => {
      bahan.push(e.value);
    });
    const gmbr = data.poto[0];

    uploadImage(gmbr)
      .then((response) => {
        axios
          .post(
            `${process.env.REACT_APP_BASEURL}/api/v1/create-food`,
            {
              name: data.nameFood,
              description: data.desc,
              imageUrl: response,
              ingredients: bahan,
            },
            {
              headers: {
                apiKey: process.env.REACT_APP_APIKEY,
                "Conten-Type": "application/json",
                Authorization: "Bearer " + process.env.REACT_APP_JWTOKEN,
              },
            }
          )
          .then((respon) => {
            alert(respon.data.message);
            window.location.assign("/admin");
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="font">
      <Container>
        <Row className="justify-content-center pt-4">
          <h2 className="text-center">Form Add Food</h2>
          <Col md={5}>
            <div className="kolom-add p-3 border-1">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Name Food</Form.Label>
                  <InputGroup>
                    <div className="icon">
                      <FontAwesomeIcon icon={faBowlFood} />
                    </div>
                    <Form.Control type="text" {...register("nameFood")} placeholder="Name Food" />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" {...register("desc")} rows={3} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-4">
                  <Form.Label>Poto</Form.Label>
                  <Form.Control {...register("poto")} type="file" name="poto" />
                </Form.Group>
                <p className="text-danger">{errors.poto?.message}</p>
                <Form.Group>
                  <Controller
                    name="bahan"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isMulti
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={value ? value : []}
                        onChange={onChange}
                      />
                    )}
                  />
                </Form.Group>
                <div className="mt-2 d-flex justify-content-around ">
                  <Button variant="outline-light" className="back-color" type="submit">
                    Submit
                  </Button>{" "}
                  <Button variant="outline-light" className="back-color" type="reset">
                    Cancel
                  </Button>{" "}
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddFood;