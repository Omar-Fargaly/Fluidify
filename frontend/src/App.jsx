import { Route, Routes } from "react-router-dom"
import Header from "./components/layout/Header"
import Home from "./pages/home"
import Footer from "./components/layout/Footer"
import About from "./pages/about"
import Login from "./pages/login"


function App() {
  return (
    <>
    <Header />
     <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/about" Component={About}/>
      <Route path="/login" Component={Login}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
