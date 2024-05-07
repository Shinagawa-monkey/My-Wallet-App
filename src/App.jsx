import { Routes, Route, Navigate } from 'react-router-dom'

//pages & components
import Navigationbar from './components/Navbar'
import { useAuthContext } from './hooks/useAuthContext'
import { useTheme } from './hooks/useTheme'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import NotFound from './pages/notFound/NotFound'
import Footer from './pages/Footer/Footer'

function App() {
  const { authIsReady, user } = useAuthContext()
  const { mode } = useTheme()

  return (
    <div
      className={`App ${
        mode === 'light' ? 'bg-light text-dark' : 'bg-dark text-white'
      }`}
      style={{ minHeight: '100%' }}
    >
      {authIsReady && (
        <>
          <Navigationbar />
          <Routes>
            <Route
              path="/"
              element={
                user ? <Home /> : <Navigate to="/login" replace={true} />
              }
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" replace={true} />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" replace={true} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
