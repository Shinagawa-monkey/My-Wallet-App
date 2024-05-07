import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
