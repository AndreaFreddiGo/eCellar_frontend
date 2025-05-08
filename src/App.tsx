// App.tsx
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

import { useState, useEffect } from 'react'
import EcellaNavbar from './components/EcellarNavbar'
import LoginModal from './components/LoginModal'

import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserProfile from './pages/UserProfile'
import WinesSearchPage from './pages/WinesSearchPage'
import EcellarFooter from './components/EcellarFooter'
import { AuthUser } from './types/AuthUser'

function App() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isUserLoaded, setIsUserLoaded] = useState(false)

  useEffect(() => {
    const name = localStorage.getItem('name')
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    const profilePicture = localStorage.getItem('profilePicture') || ''
    if (name && username && userId) {
      setUser({
        name,
        username,
        userId,
        profilePicture,
      })
    }
    setIsUserLoaded(true)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
  }

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setCurrentTheme(theme)
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        <EcellaNavbar
          user={user}
          onLoginClick={() => setShowLoginModal(true)}
          onLogout={handleLogout}
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
        />
        <main className="page-main">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  user={user}
                  onLoginClick={() => setShowLoginModal(true)}
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
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    />
                    <div className="mt-3">Loading...</div>
                  </div>
                )
              }
            />
            <Route path="/wines" element={<WinesSearchPage />} />
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
    </BrowserRouter>
  )
}

export default App
