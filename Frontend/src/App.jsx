import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import { useEffect } from 'react'
import { useAuth } from './hooks/auth'
import Bookmarks from './Pages/Bookmarks'

function App() {
  const { setUser } = useAuth()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken)
      setUser({
        accessToken,
      })
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </>
  )
}

export default App
