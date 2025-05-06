// App.tsx
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

import { useState, useEffect } from 'react'
import EcellaNavbar from './components/EcellarNavbar'
import LoginModal from './components/LoginModal'
import { UserInfo } from './types/UserInfo'

import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserProfile from './pages/UserProfile'

function App() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isUserLoaded, setIsUserLoaded] = useState(false)

  useEffect(() => {
    const name = localStorage.getItem('name')
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    const profilePicture = localStorage.getItem('profilePicture') || ''
    const phone = localStorage.getItem('phone') || ''
    const bio = localStorage.getItem('bio') || ''
    const location = localStorage.getItem('location') || ''
    const shippingAddress = localStorage.getItem('shippingAddress') || ''
    if (name && username && userId) {
      setUser({
        name,
        username,
        userId,
        profilePicture,
        phone,
        bio,
        location,
        shippingAddress,
      })
    }
    setIsUserLoaded(true)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <BrowserRouter>
      <EcellaNavbar
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      <LoginModal
        showLoginModal={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        setUser={setUser}
        onSignUpClick={() => console.log('Redirect to sign up')}
      />

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
                <UserProfile user={user} />
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
