import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

import HomePage from './pages/HomePage'
import CustomNavbar from './components/CustomNavbar'

function App() {
  return (
    <>
      <CustomNavbar />
      <HomePage />
    </>
  )
}

export default App
