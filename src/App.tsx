// App.tsx
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

import { useState, useEffect } from 'react'
import EcellaNavbar from './components/eCellarNavbar'
import LoginModal from './components/LoginModal'
import HomePage from './pages/HomePage'
import { UserInfo } from './types/UserInfo'

function App() {
  // This is the global user state used across the application
  const [user, setUser] = useState<UserInfo | null>(null)

  // This state controls the visibility of the login modal
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Load user info from localStorage on app start (if already logged in)
  useEffect(() => {
    const name = localStorage.getItem('name')
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    const profilePicture = localStorage.getItem('profilePicture')
    if (name && username && userId && profilePicture) {
      setUser({ name, username, userId, profilePicture })
    }
  }, [])

  // This function handles logout logic
  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <>
      <EcellaNavbar
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      <LoginModal
        showLoginModal={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        setUser={setUser}
        onSignUpClick={() => console.log('Redirect to sign up')} // Add actual redirect logic if needed
      />
      <HomePage />
    </>
  )
}

export default App
