import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import '../css/index.css'
import '../css/common.css'
import '../css/font.css'
import axios from 'axios'

import styles from './main.module.css'

axios.defaults.withCredentials = true

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('#root not found in index.html')

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <main className={styles.main_grid}>
      <div className={styles.dummy_block} />
      <div>
        <App />
      </div>
      <div className={styles.dummy_block} />
    </main>
  </BrowserRouter>,
)
