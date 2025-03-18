import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import PageTransition from './components/PageTransition'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PageTransition>
        <App />
      </PageTransition>
    </BrowserRouter>
  </React.StrictMode>,
)
