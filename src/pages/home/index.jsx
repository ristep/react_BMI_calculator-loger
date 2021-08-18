import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Col,
  Container,
  Form,
  // InputGroup,
  Row,
  Badge,
} from "react-bootstrap";
// import ReactJson from "react-json-view";

const initialValues = {
  age: "ageNone",
  gender: "Other",
  weight: 90,
  height: 1.75,
  BMI: 0,
};

const bmiRanges = [
  { from: 0,   to: 12, color: "black",     message: "Extremely underweight" },
  { from: 12,  to: 18.5,color:"#00BFCA", message: "Underweight" },
  { from: 18.5,to: 25, color: "#2FBE02", message: "Normal weight" },
  { from: 25,  to: 30, color: "#B78600", message: "Overweight"   },
  { from: 30,  to: 35, color: "#BA4B03", message: "Obese Class I" },
  { from: 35,  to: 40, color: "#FF1700", message: "Obese Class II" },
  { from: 40,  to: 45, color: "#700f1c", message: "Obese Class III" },
  { from: 45,  to:500, color: "black",     message: "Extremely obese" },
];

const genderCor = (gender) => {
  var ret= 0.0;
  switch (gender) {
    case "Male":
      ret = 0.0;
    break;  
    case "Female":
      ret = 1.0;
    break;  
    case "Other":
    case "":  
      ret = 0.5;  
    break;  
    default:
      ret = 0.0;
  }
  return ret;
};

const ageCorTable = {
"ageNone": -0.0,
"age1924": -0.0,
"age2534": -1.0,
"age3544": -2.0,
"age4554": -3.0,
"age5564": -4.0,
"age65AB": -5.0,
};

const ageCor = (age) => {
  return Number(ageCorTable[age]);
};

const bmiDescription = (bmi) => {
  var ret = {};
  bmiRanges.every((range) => {
    if ( bmi >= range.from && bmi < range.to) {
      ret = { color:range.color, message:range.message };
      return false;
    }
    return true;
  });
  return ret;
};

const schema = yup.object().shape({
  age: yup.number().min(2).max(150).required(),
  gender: yup.string().oneOf(["Male", "Female", "Other"]),
  weight: yup.number().min(25).max(250).required(),
  height: yup.number().min(0.6).max(2.3).required(),
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
    const bmi = (formik.values.weight / Math.pow(formik.values.height, 2));
    const { color, message } = bmiDescription(bmi+ageCor(formik.values.age)+genderCor(formik.values.gender));
    setData({
      ...formik.values,
      BMI: bmi.toFixed(2),
      bmiColor: color,
      bmiMessage: message,
    });
  }, [
    formik.values 
  ]);

  return (
    <>
      <Form noValidate>
        <Row className="p-2 border bg-light">
          <Form.Group className="col-6">
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" onChange={formik.handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-6">
            <Form.Label>Age group</Form.Label>
            <Form.Select name="age" onChange={formik.handleChange}>
              <option value="ageNone">Select</option>
              <option value="age1924">19-24</option>
              <option value="age2534">25-34</option>
              <option value="age3544">35-44</option>
              <option value="age4554">45-54</option>
              <option value="age5564">55-64</option>
              <option value="age65AB">65-120</option>
            </Form.Select>
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
        <Row md={12} className="p-2 border bg-light">
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
          <Form.Group as={Col} md="3">
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
            <h2 style={{ marginTop: "0.1em" }}>
              <Badge id="bmiIndicator" className="border" style={{ backgroundColor: data.bmiColor }}>
                BMI = {data.BMI}
              </Badge>
            </h2>
            <label for="bmiIndicator"> {data.bmiMessage}</label>
          </Col>
          <Col></Col>
          <Col>
            <Button
              onClick={formik.onSubmit}
              style={{
                contentAlign: "center",
                width: "100%",
                marginTop: "0.5em",
              }}
            >
              Log data
            </Button>
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
