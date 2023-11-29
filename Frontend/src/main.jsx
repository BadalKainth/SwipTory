import React from 'react'
import ReactDOM from 'react-dom/client'
import Modal from 'react-modal'
import App from './App.jsx'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AppProvider } from './contexts/AppContext'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { EventEmitter } from './contexts/EventEmitter.jsx'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

Modal.setAppElement('#root')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <ToastContainer />
          <EventEmitter>
            <App />
          </EventEmitter>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
