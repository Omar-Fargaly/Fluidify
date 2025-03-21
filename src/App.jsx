import { Route, Routes } from "react-router-dom"
import Header from "./Components/Layout/Header"
import Home from "./Pages/Home"
import Footer from "./Components/Layout/Footer"
import About from "./Pages/About"

function App() {
  return (
    <>
    <Header />
     <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/about" Component={About}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
