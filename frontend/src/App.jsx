
import Header from './components/Header';
import { RecoilRoot } from 'recoil';
import CustomRouter from './components/router/CustomRouter';
import SessionCheck from './components/session/SessionCheck';

function App() {

  return (
    <>
      <RecoilRoot>
        <SessionCheck/>
        <Header />
        <CustomRouter/>
      </RecoilRoot>
    </>
  );
}

export default App
