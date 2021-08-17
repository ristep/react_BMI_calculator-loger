import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Badge,
} from "react-bootstrap";
import ReactJson from "react-json-view";

const initialValues = {
  age: 25,
  gender: "",
  weight: 0,
  height: 0,
  BMI: 0,
};

const schema = yup.object().shape({
  age: yup.number().min(2).max(150).required(),
  gender: yup.string().oneOf(["Male", "Female","Other"]),
  weight: yup.number().min(25).max(250).required(),
  height: yup.number().min(.60).max(2.30).required(),
});

function Forma() {
  const [data, setData] = useState(initialValues);

  const formik = useFormik({
    validationSchema: schema,
    initialValues,
    onSubmit: (values) => {
      values.preventdefaults();
      console.log(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    setData({
      ...formik.values,
      BMI: (formik.values.weight / Math.pow(formik.values.height, 2)).toFixed(2),
    });
  }, [formik.values]);

  return (
    <Container>
      <Form noValidate onSubmit={formik.onSubmit}>
        <Row md={12} className="mb-4">
          <Form.Group as={Col} md={6}>
            <Form.Label>Age</Form.Label>
            <Form.Control  
              step="1"
              type="number"
              placeholder="Age"
              name="age"
              value={formik.values.are}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.age}
            />
          </Form.Group>
          <Form.Group inline={true} as={Col} md={6} >
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" onChange={formik.handleChange} >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row md={12} className="mb-4">
          <Form.Group as={Col} md="10" >
            <Form.Label>Height</Form.Label>
            <Form.Control
              className="form-range"
              min="0.6"
              max="2.30"
              step="0.01"
              type="range"
              placeholder="Height"
              name="height"
              value={formik.values.height}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.height}
            />
          </Form.Group>
          <Form.Group as={Col} md="2">
            <Form.Control
              style={{ marginTop: "20px" }}
              type="text"
              name="height"
              value={formik.values.height}
              onChange={formik.handleChange}
              isValid={formik.touched.height && !formik.errors.height}
            />
          </Form.Group>
        </Row>
        <Row md={12} className="mb-4">
          <Form.Group as={Col} md="10">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              className="form-range"
              min="1"
              max="250"
              step="0.1"
              type="range"
              placeholder="Weight"
              name="weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.weight}
            />
          </Form.Group>
          <Form.Group as={Col} md="2" >
            <Form.Control
              style={{ marginTop: "20px" }}
              type="number"
              name="weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
              isValid={formik.touched.weight && !formik.errors.weight}
            />
          </Form.Group>
        </Row>
        <Row md={12} className="mb-4">
          <h2>
            Body Mass Index (BMI) <Badge bg="primary">{data.BMI}</Badge>
          </h2>
        </Row>
        <Button type="submit">Log data</Button>
        <ReactJson src={data} />
      </Form>
    </Container>
  );
}

const Home = () => {
  return (
    <Container>
      <Forma setValues />
    </Container>
  );
};

export default Home;
