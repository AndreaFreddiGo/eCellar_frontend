import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../services/userService'
import { AuthUser } from '../types/AuthUser'
import axios from 'axios'

interface OAuthRedirectProps {
  setUser: (user: AuthUser) => void
}

const OAuthRedirect = ({ setUser }: OAuthRedirectProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get('token')

    if (token) {
      localStorage.setItem('token', token)

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      getCurrentUser()
        .then((userData) => {
          const authUser = {
            name: userData.name,
            username: userData.username,
            userId: userData.id,
            profilePicture: userData.profilePicture,
          }

          setUser(authUser)
          localStorage.setItem('userId', userData.id)
          localStorage.setItem('username', userData.username)
          localStorage.setItem('name', userData.name)
          localStorage.setItem('profilePicture', userData.profilePicture || '')
        })
        .catch((err) => {
          console.error('Error fetching user profile:', err)
        })
        .finally(() => {
          setTimeout(() => navigate('/'), 50)
        })
    } else {
      console.warn('No token found in OAuth redirect')
      navigate('/')
    }
  }, [navigate, setUser])

  return <div className="text-center py-5">Logging in with Google...</div>
}

export default OAuthRedirect
