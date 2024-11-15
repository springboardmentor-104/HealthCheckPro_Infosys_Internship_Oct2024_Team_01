// Code: Main entry point for the frontend application
// Wrap your ContextProvider here. Important: Wrap to RouterProvider only

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '../theme.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LandingPage, Login, Register, ResetPassword,Dashboard,TestPortal } from './pages'
import GlobalProvider from './context/GlobalProvider'
import ThemeProvider from './context/ThemeProvider'
import {DashHome,LeaderBoards} from './components/dashboard_sections'




// Add or remove routes as needed
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/reset-pass/:email',
    element: <ResetPassword />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path:'',
        element:<DashHome/>
      },
      {
        path:'leaderboard',
        element:<LeaderBoards/>
      },
    ]
  },
  {
    path: '/assessment/attempt/:id',
    element: <TestPortal/>
  },

])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider>
      <ThemeProvider>
        <GlobalProvider>
          <RouterProvider router={router} />
        </GlobalProvider>
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>,
)
