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
import SignUpModal from './components/SignUpModal'
import axios from 'axios'

function App() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isUserLoaded, setIsUserLoaded] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')
  const [showSignUpModal, setShowSignUpModal] = useState(false)

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
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('username')
    const name = localStorage.getItem('name')
    const profilePicture = localStorage.getItem('profilePicture')

    if (token && userId && username) {
      setUser({
        userId,
        username,
        name: name || '',
        profilePicture: profilePicture || '',
      })

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    // ✅ aggiungi SEMPRE questo, anche se l'if fallisce
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
              !isUserLoaded ? (
                <div className="text-center pt-5 mt-5">
                  <div className="spinner-border text-primary" role="status" />
                  <div className="mt-3">Loading...</div>
                </div>
              ) : !user ? (
                <Navigate to="/" replace />
              ) : (
                <UserProfile />
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
        onSignUpClick={() => {
          setShowLoginModal(false)
          setShowSignUpModal(true)
        }}
      />

      <SignUpModal
        show={showSignUpModal}
        handleClose={() => setShowSignUpModal(false)}
        onRegistered={() => setShowSignUpModal(false)}
        onLoginSuccess={(data) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.userId)
          localStorage.setItem('username', data.username)
          localStorage.setItem('name', data.name)
          localStorage.setItem('profilePicture', data.profilePicture || '')

          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${data.token}`

          setUser({
            userId: data.userId,
            username: data.username,
            name: data.name,
            profilePicture: data.profilePicture,
          })

          navigate('/me')
        }}
      />

      <EcellarFooter />
    </div>
  )
}

export default App
