import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import { useEffect } from 'react'
import { useAuth } from './hooks/auth'

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/story/:id" element={<Home />} />
    </Routes>
  )
}

export default App
