import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import Home from "./pages/home"
import About from "./pages/about"
import Login from "./pages/login"
import Layout from "./components/layout/Layout"
const router = createBrowserRouter([
  {path:'' ,element:<Layout/>,children:[
    {index: '',element:<Home/>},
    {path: '',element:<Home/>},
    {path: 'about',element:<About/>},
    {path: 'login',element:<Login/>}
  ]}
])
function App() {
  return (
    <>
    <RouterProvider router={router}>

    </RouterProvider>
    </>
  )
}

export default App
