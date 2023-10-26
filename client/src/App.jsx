import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllCountries, getData } from "./redux/actions/actions"
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landing/landing'
import Home from "./pages/home/Home"


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCountries())
      dispatch(getData())
  }, [])


  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="home" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
