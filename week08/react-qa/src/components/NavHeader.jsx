import { Container, Navbar } from 'react-bootstrap';

function NavHeader (props) {
  return(
    <Navbar bg='primary' data-bs-theme='dark'>
      <Container fluid>
        <Navbar.Brand>HeapOverrun - Question {props.questionNum}</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavHeader;