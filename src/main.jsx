import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import PageTransition from './components/PageTransition'
import Preloader from './components/Preloader'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Preloader>
      <BrowserRouter>
        <PageTransition>
          <App />
        </PageTransition>
      </BrowserRouter>
    </Preloader>
  </React.StrictMode>,
)
