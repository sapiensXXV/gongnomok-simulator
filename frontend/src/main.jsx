
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import '../css/index-xs.css'
import '../css/index-sm.css'
import '../css/index-md.css'
import '../css/index-lg.css'
import '../css/index-xl.css'
import '../css/index-xxl.css'
import '../css/common.css'
import '../css/font.css'
import axios from 'axios'

import styles from './main.module.css'

axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>

{/*    <div className={`row gongnomok-global ${styles.main_grid} `}>
      <div className='col col-lg-0 col-xxl-2'></div>
      <div className='col-lg-12 col-xxl-8'>

        <App/>

      </div>
      <div className='col-lg-0 col-xxl-2'></div>
    </div>*/}

    <main className={styles.main_grid}>
      <div className={styles.dummy_block}/>
      <div className=''>
        <App/>
      </div>
      <div className={styles.dummy_block}/>
    </main>


  </BrowserRouter>
)
