import './App.css';
import Container from './Container';
import { easyX, dispatch } from '../easyx';

const MyContainer = easyX(Container);

setTimeout(() => dispatch({ title: 'hello world' }), 2000)
function App() {
  return (
    <div className="App">
      <MyContainer></MyContainer>
      <MyContainer></MyContainer>
      <Container></Container>
      <Container></Container>
    </div>
  );
}

export default App;
