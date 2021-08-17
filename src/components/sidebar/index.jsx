import React from 'react';
import { Offcanvas } from "react-bootstrap";

import { SideBarJSON } from './SideBarJSON';

import './sidebar.scss';
import { FaRegWindowClose } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

function SideBar(props) {
  const { sidebar, togleSidebar } = props.mehanics;
  const history = useHistory();

  return (
    <Offcanvas show={sidebar} onClick={togleSidebar} className="sidebar">
      <Offcanvas.Header>
        <Offcanvas.Title>
          <FaRegWindowClose onClick={togleSidebar} />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="sidebar-nav">
        {SideBarJSON.map((item, index) =>
          <div key={index} onClick={() => history.push(item.path)} className="sidebar-row">
            <label className="sidebar-icon">{item.icon}</label>
            <label className="sidebar-title">{item.title}</label>
          </div>
        )}
      </Offcanvas.Body>

    </Offcanvas>
  );
}

export default SideBar;
