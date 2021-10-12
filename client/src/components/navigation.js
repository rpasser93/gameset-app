import { Navbar, Container, Nav } from 'react-bootstrap'

const Navigation = () => {

  if (window.location.pathname === '/login') {
    return (
      <div></div>
    )}

  return (
    <Navbar className="navbar-bg" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand><strong><em>GameSet</em></strong>App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="navbar-link" href="/roster/:id">Roster</Nav.Link>
            <Nav.Link className="navbar-link" href="/lineup/:id">Lineup</Nav.Link>
            <Nav.Link className="navbar-link" href="/settings/:id">Settings</Nav.Link>
            <Nav.Link className="navbar-link" href="/login">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Navigation