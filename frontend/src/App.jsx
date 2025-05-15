import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import Navbar from './components/Navbar.jsx'
import { axiosInstance } from './lib/axios.js'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  const {theme,setTheme} = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='animate-spin' size={32} />
      </div>
    )
  }
  
  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to="/"/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>

      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
