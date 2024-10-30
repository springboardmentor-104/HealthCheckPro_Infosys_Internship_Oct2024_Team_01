// Code: Main entry point for the frontend application
// Wrap your ContextProvider here. Important: Wrap to RouterProvider only

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '../theme.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, Login, Register, ResetPassword,Dashboard } from './pages'
import GlobalProvider from './context/GlobalProvider'
import ThemeProvider from './context/ThemeProvider'
import {DashHome, Assessment} from './components/dashboard_sections/index.js'

// Add or remove routes as needed
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
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
        path: '',
        element: <DashHome />,
      },
      {
        path: 'assessment', // New route for the Assessment page
        element: <Assessment />,
      },
    ],
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
