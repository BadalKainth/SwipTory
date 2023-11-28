import React from 'react'
import ReactDOM from 'react-dom/client'
import Modal from 'react-modal'
import App from './App.jsx'
import axios from 'axios'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AppProvider } from './contexts/AppContext'

axios.defaults.baseURL = 'http://localhost:3000'

Modal.setAppElement('#root')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
