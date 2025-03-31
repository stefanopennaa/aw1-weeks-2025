import { Navbar, Container } from 'react-bootstrap';

function NavHeader(props) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >HeapOverrun - Question #{props.questionId}</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavHeader;