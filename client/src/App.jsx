import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllCountries, getData } from "./redux/actions/actions"
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/landing/landing'
import Home from "./pages/home/Home"
import Nav from "./components/nav/Nav"
import CreateActivity from "./pages/createActivity/CreateActivity"
import Detail from "./pages/detail/detail"

function App() {

  const dispatch = useDispatch()
  const {pathname} = useLocation()

  useEffect(() => {
      dispatch(getAllCountries())
      dispatch(getData())
  }, [])


  return (
    <div>
      {pathname !== "/" && <Nav/>}
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="countries/:countryId" element={<Detail/>}/>
        <Route path="create" element={<CreateActivity/>}/>
      </Routes>
    </div>
  )
}

export default App
