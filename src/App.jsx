import "./styles/App.scss";

import React from "react";

import Home from "pages/home";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import About from "pages/about";
import { ProvideAuthData } from "hooks/authData";
import LoginForm from "pages/loginForm";

import User from "pages/user";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MainNavBar from "components/mainNavBar";
import RegisterUser from "pages/RegisterUser";
import NewUserUpdate from "pages/NewUserUpdate";
import AppFooter from "pages/AppFooter";

const AppBody = (props) => {
  const { setTheme } = props;

  return (
    <Container className="appBody">
      <Switch>
        <Route exact path={["/", "/home", "/doma"]}>
          <Home />
        </Route>

        <Route path="/about">
          <About setTheme={setTheme} />
        </Route>

        <Route exact path="/register/new_user/:userID">
          <NewUserUpdate />
        </Route>

        <Route exact path="/user/:userID">
          <User />
        </Route>

        <Route path="/login">
          <LoginForm />
        </Route>

        <Route path="/register">
          <RegisterUser />
        </Route>
      </Switch>
    </Container>
  );
};

function App() {
  const [theme, setTheme] = useState("./styles/Cerulean/main.css");
  // const [sidebar, setSidebar] = useState(true);
  // const togleSidebar = () => setSidebar(!sidebar);

  return (
    <div className="App">
      <link rel="stylesheet" type="text/css" href={theme} />
      <ProvideAuthData>
        <Router>
          <MainNavBar />
          <Container>
            <Row>
              <Col>
              </Col>
              <Col xs={10}>
                <AppBody setTheme={setTheme} />
              </Col>
              <Col>
              </Col>
            </Row>
          </Container>
          <AppFooter />
        </Router>
      </ProvideAuthData>
    </div>
  );
}

export default App;
