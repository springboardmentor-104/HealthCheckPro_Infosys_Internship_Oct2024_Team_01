// Code: Main entry point for the frontend application
// Wrap your ContextProvider here. Important: Wrap to RouterProvider only

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from '../theme.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LandingPage, Login, Register, ResetPassword,Dashboard,Admin } from './pages'
import GlobalProvider from './context/GlobalProvider'
import ThemeProvider from './context/ThemeProvider'
import {DashHome,LeaderBoards,Assessment} from './components/dashboard_sections'
import Question from './components/Question.jsx'
import AddQuestionForm from './components/admin_sections/AddQuestionForm.jsx'
import AddCategoryForm from './components/admin_sections/AddCategoryForm.jsx'
import Questions from './components/admin_sections/Questions.jsx'


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
        element:<LeaderBoards/>
      },
    ]
  },
  {
    path: 'test',
    element: <Question/>
  },
  {
    path:'admin',
    element:<Admin/>,
    children:[
      {
        path:'',
        element:<AddQuestionForm/>
      },
      {
        path:'add-category',
        element:<AddCategoryForm/>
      },
      {
        path: 'questions',
        element: <Questions />
      }
    ]
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
