import { Outlet } from "react-router-dom"
import './App.css'
import Navbar from "./components/Navbar"


function App() {

  return (
    <>
      <Navbar />
      {/*Outlet renders all the children of the app.jsx */}
      <main className="min-h-screen w-1/2 mx-auto px-4 py-6 font-primary">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App
