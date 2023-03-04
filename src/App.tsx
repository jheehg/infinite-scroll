import './globals.css';

import styled from 'styled-components';
import Header from './components/Header';
import Container from './pages/Container';

const MainContainer = styled.div`
  text-align: center;
`;

function App() {
  return (
    <MainContainer>
      <Header />
      <Container />
    </MainContainer>
  );
}

export default App;
