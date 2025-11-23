import { Outlet } from "react-router-dom"
import './App.css'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"


function App() {


  // frontend lecture ends at - 3:54
  return (
    <>
      <Navbar />
      {/*Outlet renders all the children of the app.jsx */}
      <main className="min-h-screen w-100% mx-auto px-4 py-6 font-primary">
        <Outlet />
      </main>
      <footer><Footer /></footer>
    </>
  )
}

export default App
 