// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import RouteTest from './pages/test/RouteTest'
import NewItem from './pages/Item/NewItem'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'></div>
          <div className='col-9'>

            
            <BrowserRouter>
              <div>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/item/new" element={<NewItem />}/>
                </Routes>
                
                {/* <RouteTest /> */}
              </div>
              
              
            </BrowserRouter>
          </div>
          <div className='col'></div>
        </div>
      </div>
    </>
  )
}

export default App
