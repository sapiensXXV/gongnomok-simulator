
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import '../css/index.css'
import '../css/index-xs.css'
import '../css/index-sm.css'
import '../css/index-md.css'
import '../css/index-lg.css'
import '../css/index-xl.css'
import '../css/index-xxl.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>

      <div className='row gongnomok-global'>
        <div className='col col-lg-0 col-xxl-2'></div>
        <div className='col-lg-12 col-xxl-8'>

          <App />

        </div>
        <div className='col-lg-0 col-xxl-2'></div>
      </div>


    </BrowserRouter>
  // </React.StrictMode>


)
