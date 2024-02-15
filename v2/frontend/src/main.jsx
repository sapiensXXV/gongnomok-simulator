
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>

      <div className='row'>
        <div className='col-2'></div>
        <div className='col-8'>

        <App />

        </div>
        <div className='col-2'></div>
      </div>

      
    </BrowserRouter>
  // </React.StrictMode>,
)
