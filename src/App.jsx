// Desc: Main App component that renders the layout and the outlet for the routes
// Usage: This component is rendered when the user visits the application

import { Outlet } from "react-router-dom"
import Layout from "./components/Layout"

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App
