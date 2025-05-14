import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import EcellaNavbar from './components/EcellarNavbar'
import EcellarFooter from './components/EcellarFooter'
import LoginModal from './components/LoginModal'

import HomePage from './pages/HomePage'
import UserProfile from './pages/UserProfile'
import UserCellars from './pages/UserCellars'
import WinesSearchPage from './pages/WinesSearchPage'
import OAuthRedirect from './pages/OAuthRedirect'

import { AuthUser } from './types/AuthUser'

function App() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isUserLoaded, setIsUserLoaded] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')

  const navigate = useNavigate()

  useEffect(() => {
    const body = document.body

    if (currentTheme === 'dark') {
      body.classList.add('dark-mode')

      const timeout = setTimeout(() => {
        body.classList.add('lit')
      }, 50)

      return () => clearTimeout(timeout)
    } else {
      body.classList.remove('lit', 'dark-mode')
    }
  }, [currentTheme])

  // Recupera utente da localStorage
  useEffect(() => {
    const name = localStorage.getItem('name')
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    const profilePicture = localStorage.getItem('profilePicture') || ''
    if (name && username && userId) {
      setUser({ name, username, userId, profilePicture })
    }
    setIsUserLoaded(true)
  }, [])

  const handleLogin = () => {
    setShowLoginModal(true)
  }

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    navigate('/')
  }

  return (
    <div className="app-layout">
      <EcellaNavbar
        user={user}
        onLoginClick={handleLogin}
        onLogout={handleLogout}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />

      <main className="page-main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                user={user}
                onLoginClick={handleLogin}
                isDark={currentTheme === 'dark'}
              />
            }
          />
          <Route
            path="/me"
            element={
              isUserLoaded ? (
                user ? (
                  <UserProfile />
                ) : (
                  <Navigate to="/" replace />
                )
              ) : (
                <div className="text-center pt-5 mt-5">
                  <div className="spinner-border text-primary" role="status" />
                  <div className="mt-3">Loading...</div>
                </div>
              )
            }
          />
          <Route path="/wines" element={<WinesSearchPage />} />
          <Route path="/cellars" element={<UserCellars />} />
          <Route
            path="/oauth2/redirect"
            element={<OAuthRedirect setUser={setUser} />}
          />
        </Routes>
      </main>

      <LoginModal
        showLoginModal={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        setUser={setUser}
        onSignUpClick={() => console.log('Redirect to sign up')}
      />
      <EcellarFooter />
    </div>
  )
}

export default App
