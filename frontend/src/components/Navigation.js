import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const handleLogout = () => {
    localStorage.removeItem("token");
  }

  let navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  if (!isLoggedIn) {
    navigate('/login');
    
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home">Social Media App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>

            {isLoggedIn ? (
              <Nav.Link href="/login" onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
            )}

            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Navigation;
