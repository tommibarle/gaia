import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import YarnList from './components/YarnList';
import AddYarn from './components/AddYarn';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Gestione Borse</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Dashboard />
        <AddYarn />
        <YarnList />
      </Container>
    </>
  );
}

export default App;