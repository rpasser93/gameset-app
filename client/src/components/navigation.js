import { Navbar, Container, Nav } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router";

const Navigation = () => {
  const [page, setPage] = useState(window.location.pathname);

  const team = useSelector(state => state.team);

  console.log(team);

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => { 
      setPage(window.location.pathname);
    })},[history]);

  if (window.location.pathname === '/login') {
    return (
      <div></div>
    )}

  return (
    <Navbar className="navbar-bg" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand><strong><em>GameSet</em></strong>App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="navbar-link" href={`/roster/${team[0]._id}`}>Roster</Nav.Link>
            <Nav.Link className="navbar-link" href={`/lineup/${team[0]._id}`}>Lineup</Nav.Link>
            <Nav.Link className="navbar-link" href={`/settings/${team[0]._id}`}>Settings</Nav.Link>
            <Nav.Link className="navbar-link" href="/login">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Navigation