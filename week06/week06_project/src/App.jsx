import React from 'react';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import NavHeader from './components/NavHeader.jsx';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <NavHeader questionId={1} />
      <Container fluid>
        Prova
      </Container>
    </>
  );
}

export default App;
