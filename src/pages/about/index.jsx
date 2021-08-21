import React from "react";
import { Button, Container } from "react-bootstrap";
import ReactJson from "react-json-view";
import { useAuthData } from "hooks/authData";
import { useBmiHistory } from "hooks/useBmiHistory";

const About = (props) => {
  const { setTheme } = props;
  const { authData } = useAuthData();
  const { data } = useBmiHistory({userID: authData.data.id}); 

  const them = (theme) => ("./styles/" + theme + "/main.css" );

  return (
    <Container>
      <h2>Home page</h2>
      <h3>Choose Botswatch theme</h3>
      <Button style={{backgroundColor:"rgb(217, 227, 241)"}} onClick={()=>setTheme(them("Morph"))}>Morph</Button>
      <Button style={{backgroundColor:"rgb(120, 194, 173)"}} onClick={()=>setTheme(them("Minty"))}>Minty</Button>
      <Button style={{backgroundColor:"rgb(44, 62, 80)"}}    onClick={()=>setTheme(them("Flatly"))}>Flatly</Button>
      <Button style={{backgroundColor:"rgb(47, 164, 231)"}}  onClick={()=>setTheme(them("Cerulean"))}>Cerulean</Button>
      <Button style={{backgroundColor:"rgb(69, 130, 236)"}}  onClick={()=>setTheme(them("Litera"))}>Litera</Button>
      <ReactJson src={data} />
   </Container>
  );

}

export default About;