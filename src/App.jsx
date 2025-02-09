import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppShell, Burger, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Sidebar from './core/components/sidebar/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { isTokenExpired } from './core/components/authentication/verifyToken'

function App() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      if (isTokenExpired()) {
        localStorage.removeItem("token");
        navigate("/login"); // Redirect user to login page
      }
    };
    checkToken(); // Run immediately on page load
    const interval = setInterval(checkToken, 60000); // Check every 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [navigate]);
  return (
    <>
      <AppShell
        navbar={{
          width: 250,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
      >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            style={{ position: 'absolute', top: 20, left: 20, zIndex: 1000 }}
          />
        <AppShell.Navbar h='100%'><Sidebar/></AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  )
}

export default App
