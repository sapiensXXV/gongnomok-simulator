import Header from './components/Header'
import { RecoilRoot } from 'recoil'
import CustomRouter from './components/router/CustomRouter'
import SessionCheck from './components/session/SessionCheck'
import './App.css'

function App() {
  return (
    <RecoilRoot>
      <SessionCheck />
      <div className="page-layout">
        <Header />
        <CustomRouter />
      </div>
    </RecoilRoot>
  )
}

export default App
