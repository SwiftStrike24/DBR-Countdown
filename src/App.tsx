import styled from 'styled-components';
import { CountdownTimer } from './components/CountdownTimer';
import { ValueDisplay } from './components/ValueDisplay';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #121212;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #888;
  margin-bottom: 2rem;
  text-align: center;
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  background: #333;
  border-radius: 50%;
  margin-bottom: 2rem;
`;

function App() {
  return (
    <AppContainer>
      <Logo />
      <Title>deBridge Foundation</Title>
      <Subtitle>Second Distribution Countdown</Subtitle>
      <CountdownTimer />
      <ValueDisplay />
    </AppContainer>
  );
}

export default App;
