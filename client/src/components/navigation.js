import { Navbar, Container, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import {useState, useEffect} from 'react'

const Navigation = () => {
  const [activePage, setActivePage] = useState("");

  const team = useSelector(state => state.team[0]);

  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  const rosterUrl = `/roster/${paramId}`;
  const lineupUrl = `/lineup/${paramId}`;
  const settingsUrl = `/settings/${paramId}`

  useEffect(() => {
    if (window.location.pathname === rosterUrl) {
      setActivePage('roster');
    } else if (window.location.pathname === lineupUrl) {
      setActivePage('lineup');
    } else if (window.location.pathname === settingsUrl) {
      setActivePage('settings');
    }
  }, [setActivePage, rosterUrl, lineupUrl, settingsUrl]);

  if (window.location.pathname === '/login') {
    return (
      <div></div>
    )}

  const renderNavLinks = () => {
    if (team && team._id) {
      return (
        <Nav className="me-auto">
          <Nav.Link className="nav-bracket">|</Nav.Link>
          <Nav.Link className={`navbar-link nav-roster-${activePage}`} href={`/roster/${team._id}`}>Roster</Nav.Link>
          <Nav.Link className={`navbar-link nav-lineup-${activePage}`} href={`/lineup/${team._id}`}>Lineup</Nav.Link>
          <Nav.Link className={`navbar-link nav-settings-${activePage}`} href={`/settings/${team._id}`}>Settings</Nav.Link>
          <Nav.Link className="nav-bracket">|</Nav.Link>
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

  const renderUserName = () => {
    if (team) {
      return (
        <div className="text-end nav-username" ><u>{team.login}</u></div>
      )
    }
  }

  return (
    <div className="container-md">
      <Navbar className="navbar-bg" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand><strong><em>GameSet</em></strong>App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            {renderNavLinks()}
            {renderUserName()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
};

export default Navigation