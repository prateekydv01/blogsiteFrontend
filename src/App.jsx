import './App.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux"
import { getCurrentUser } from './api/auth.js';
import { login, logout } from "./store/authSlice.js"
import { Footer, Header } from './components/index.js';
import { Outlet } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen.jsx'; // 👈 import splash

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res?.data?.data) {
          dispatch(login({ userData: res?.data?.data }))
        } else {
          dispatch(logout())
        }
      })
      .catch(() => dispatch(logout()))
      .finally(() => setLoading(false))
  }, [dispatch])

  if (loading) {
    return <LoadingScreen />   // 👈 show designer splash instead of null
  }

  return (
    <div className='min-h-screen flex flex-col bg-slate-50'>
      <Header />
      <main className='flex-1'>
        <Outlet /> {/* renders all child routes */}
      </main>
      <Footer />
    </div>
  )
}

export default App
