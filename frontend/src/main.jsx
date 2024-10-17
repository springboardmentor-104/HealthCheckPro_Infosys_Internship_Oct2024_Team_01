// Code: Main entry point for the frontend application
// Wrap your ContextProvider here. Important: Wrap to RouterProvider only

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '../theme.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, Login, Register, Features, Contact, About, ResetPassword } from './pages'
import GlobalProvider from './context/GlobalProvider'
import ThemeProvider from './context/ThemeProvider'

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
      {
        path: 'features',
        element: <Features />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'about',
        element: <About />,
      }
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
    path: '/reset-pass',
    element: <ResetPassword />,
  },
  {
    path:'/dashboard',
    
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
