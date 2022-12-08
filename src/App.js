import Header from 'layout/Header';
import Router from 'routes/Router';
import Container from '@mui/material/Container';

function App() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="lg">
        <Router />
      </Container>
    </>
  );
}

export default App;
