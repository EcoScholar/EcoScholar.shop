import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './n.components/Navbar'
import CustomCursor from './n.components/CustomCursor'
import { AuthProvide } from './context/AuthContext'
import { StudyProvider } from './context/StudyContext'
import { useEffect, useState } from 'react'
import Loading from './n.components/Loading'
import { useLocation } from 'react-router-dom'
import Footer from './n.components/Footer'
import ChatBubble from './components/ChatBubble'

import './styles.css';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  // Hide custom cursor on mobile devices
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (loading) {
    return <Loading />; 
  }

  return (
    <>
      {!isMobile && <CustomCursor />}
      <AuthProvide>
        <StudyProvider>
          <Navbar />
          <main className='w-full min-h-screen pt-16 md:pt-20'>
            <Outlet />
          </main>
          {!isHomePage && <Footer />}
          <ChatBubble />
        </StudyProvider>
      </AuthProvide>
    </>
  )
}

export default App
