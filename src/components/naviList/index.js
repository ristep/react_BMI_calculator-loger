import React, { useMemo } from "react";
import {  Form, FormControl, Navbar, Button, ButtonGroup } from "react-bootstrap";

const location = (BaseUrl, ps, pg, sr) => {
  window.location.replace(BaseUrl + ps + "/" + pg + "/" + sr);
}

const NaviGator = (props) => {
  const { baseUrl, size, page, search, totalCount } = props.controls;
  const sz = parseInt(size);
  const pg = parseInt(page);
  const tc = parseInt(totalCount);

  const last = tc % sz > 0 ? Math.floor(tc / sz) : Math.floor(tc / sz - 1);
  const prev = pg > 0 ? pg - 1 : pg;
  const next = pg < last ? pg + 1 : pg;

  const navi = useMemo(() =>
  ({
    first: baseUrl + size + "/" + 0 + "/" + search,
    prev: baseUrl + size + "/" + prev + "/" + search,
    info: "Page " + (pg + 1) + " of " + (last + 1),
    next: baseUrl + size + "/" + next + "/" + search,
    last: baseUrl + size + "/" + last + "/" + search
  }), [baseUrl, last, next, pg, prev, search, size]);

  return (
    <ButtonGroup size="sm">
      <Button size="sm" disabled={pg === 0} href={navi.first}>First</Button>
      <Button size="sm" disabled={pg === 0} href={navi.prev}>Prev</Button>
      <Button size="sm" disabled={true} style={{ width: "150px" }}>{navi.info}</Button>
      <Button size="sm" disabled={pg === last} href={navi.next}>Next</Button>
      <Button size="sm" disabled={pg === last} href={navi.last} >Last</Button>
    </ButtonGroup>
  );
};

const NaviList = (props) => {
  const { baseUrl, page, search, size, cnt } = props;
  return (
    <Navbar className="navbar-light bg-light" bg="light" expand="lg" >
        <ButtonGroup size="sm" style={{ margin: "0 20px" }}>
          <Button light disabled>Page size:</Button>
          <Button onClick={() => location(baseUrl, 5, page, search)}>5</Button>
          <Button onClick={() => location(baseUrl, 10, page, search)}>10</Button>
          <Button onClick={() => location(baseUrl, 15, page, search)}>15</Button>
        </ButtonGroup>
        <NaviGator controls={{ baseUrl, size, page, search, totalCount: cnt }} style={{ margin: "0 30px" }} />
        <Form size="sm" className="d-flex nowrap" inline style={{ margin: "0 30px"}} >
          <FormControl size="sm" type="text" placeholder="Search" value={search} onChange={e => location(baseUrl, size, page, e.target.value)} />
          <Button disabled>{cnt}</Button>
        </Form>
    </Navbar>
  );
}

export default NaviList;