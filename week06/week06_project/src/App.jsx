import React from 'react';

// Components
import NavHeader from './components/NavHeader.jsx';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <NavHeader questionId={1} />
      <Container fluid>
        Main Content
      </Container>
    </>
  );
}

export default App;
