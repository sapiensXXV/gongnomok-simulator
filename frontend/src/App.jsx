
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';

import ItemMain from './components/Item/ItemMain';
import Login from './components/Login';
import Test from './components/Test';
import NewItem from './components/NewItem';
import ItemSimulator from './components/Item/ItemSimulator';
import axios from 'axios';

const isAdmin = () => {
  axios.get(`${BASE_URI}/api/auth`, { withCredentials: true })
    .then((response) => {
    })
    .catch((err) => {
      console.log(err)
      navigate('/login')
    })
}

function App() {

  return (
    <>

      <Header />
      <Routes>
        <Route path='/' element={<ItemMain />} />
        <Route path='/login' element={<Login />} />
        <Route path='/test' element={<Test />} />
        <Route path='/item/new' element={<NewItem />} />
        <Route path='/item/:itemId' element={<ItemSimulator />} />

      </Routes>
    </>
  );
}

export default App
