import { Navbar, Container, Nav } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router";

const Navigation = () => {
  const [page, setPage] = useState(window.location.pathname);

  const team = useSelector(state => state.team[0]);

  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => { 
      setPage(window.location.pathname);
    })},[history]);

  if (window.location.pathname === '/login') {
    return (
      <div></div>
    )}

  const renderNavLinks = () => {
    if (team && team._id) {
      return (
        <Nav className="me-auto">
          <Nav.Link className="navbar-link" href={`/roster/${team._id}`}>Roster</Nav.Link>
          <Nav.Link className="navbar-link" href={`/lineup/${team._id}`}>Lineup</Nav.Link>
          <Nav.Link className="navbar-link" href={`/settings/${team._id}`}>Settings</Nav.Link>
          <Nav.Link className="navbar-link logout-nav-link" href="/login">Log Out</Nav.Link>
        </Nav>
      )
    } else {
      return (
        <Nav className="me-auto">
          <Nav.Link className="navbar-link" href={`/roster/${paramId}`}>Roster</Nav.Link>
          <Nav.Link className="navbar-link" href={`/lineup/${paramId}`}>Lineup</Nav.Link>
          <Nav.Link className="navbar-link" href={`/settings/${paramId}`}>Settings</Nav.Link>
          <Nav.Link className="navbar-link logout-nav-link" href="/login">Log Out</Nav.Link>
        </Nav>
      )
    }
  }

  return (
    <Navbar className="navbar-bg" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand><strong><em>GameSet</em></strong>App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          {renderNavLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Navigation