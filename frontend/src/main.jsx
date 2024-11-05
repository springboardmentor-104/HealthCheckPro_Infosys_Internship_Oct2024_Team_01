// Code: Main entry point for the frontend application
// Wrap your ContextProvider here. Important: Wrap to RouterProvider only

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '../theme.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LandingPage, Login, Register, ResetPassword,Dashboard } from './pages'
import GlobalProvider from './context/GlobalProvider'
import ThemeProvider from './context/ThemeProvider'
import {DashHome,Leaderboards,Assessment} from './components/dashboard_sections/index.js'
import Question from './components/Question.jsx'


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
        path:'assessment',
        element:<Assessment/>
      },
      {
        path:'leaderboard',
        element:<Leaderboards/>
      },
    ]
  },
  {
    path: 'test',
    element: <Question/>
  }
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
