import React from 'react';
import "./style03.scss";

const Spinner = (props) => {
  const { rotate=true } = props;

  if(rotate) 
    return  <span id="spinner" className="spinner"></span>;
  else
    return "";
}

export default Spinner;
