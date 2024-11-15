import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Notfound from './Components/Notfount/Notfound'
import Category from './Components/Ctegory/Category'
function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "category", element: <Category /> },
        { path: "*", element: <Notfound /> },
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
