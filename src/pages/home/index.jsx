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
  age: 50,
  gender: "",
  weight: 90,
  height: 1.75,
  BMI: 0,
};

const bmiRanges = [
  { from:0, to:18.5, color:"#1b181b"},
  { from:18.5, to:25, color:"#cdfffb"},
  { from:25, to:30, color:"#24d424"},
  { from:30, to:35, color:"#fdbb84"},
  { from:35, to:40, color:"#fc8d59"},
  { from:40, to:45, color:"#ef6b0d"},
  { from:45, to:50, color:"#e6550d"},
  { from:50, to:55, color:"#d84315"},
  { from:55, to:60, color:"#bf360c"}, 
  { from:60, to:650, color:"#1a0c06"},
];

const schema = yup.object().shape({
  age: yup.number().min(2).max(150).required(),
  gender: yup.string().oneOf(["Male", "Female","Other"]),
  weight: yup.number().min(25).max(250).required(),
  height: yup.number().min(.60).max(2.30).required(),
});

function Forma() {
  const [data, setData] = useState(initialValues);
  const [ bmiColor, setBmiColor] = useState("grey");

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

  useEffect(() => {
    bmiRanges.forEach( (range) => { 
      if(data.BMI >= range.from && data.BMI <= range.to){
        setBmiColor(range.color);
      }
    });
  }, [data.BMI]);     


  return (
    <>
      <Form noValidate>
        <Row className="p-2 border bg-light">
          <Form.Group className="col-6" >
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" onChange={formik.handleChange} >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-6">
            <Form.Label>Age</Form.Label>
            <Form.Control  
              type="number"
              placeholder="Age"
              name="age"
              value={formik.values.are}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.age}
            />
          </Form.Group>
        </Row>

        <Row md={12} className="p-2 border bg-light">
          <Form.Group as={Col} md="9">
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
          <Form.Group as={Col} md="3">
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
        <Row md={12} className="p-2 border bg-light" >
          <Form.Group as={Col} md="9">
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
          <Form.Group as={Col} md="3" >
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
        <Row md={12} className="p-3 border bg-primary">
          <Col>
            <h2 style={{ marginTop: "0.1em"}}>
              <Badge className="border" style={{ backgroundColor: bmiColor }}>BMI = {data.BMI}</Badge>
            </h2>
          </Col>
          <Col>
          </Col>
          <Col>
            <Button onClick={formik.onSubmit} style={{contentAlign: "center", width:"100%", marginTop: "0.5em"}}>Log data</Button>
          </Col>
        </Row>
        {/* <ReactJson src={data} /> */}
      </Form>
    </>
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
