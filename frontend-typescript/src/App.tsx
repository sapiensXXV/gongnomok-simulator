import { useState } from 'react'
// import './App.css'
import { AppHeader } from './components/header/AppHeader'

function App() {
  return (
    <>
      <div className='row'>
        <div className='col col-lg-0 col-xxl-2'></div>
        <div className='col col-lg-0 col-xxl-8'>
          <AppHeader />
        </div>
        <div className='col col-lg-0 col-xxl-2'></div>
      </div>
    </>
  )
}

export default App
