import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllCountries, getData } from "./redux/actions/actions"
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './views/landing/landing'
import Home from "./views/home/Home"
import Nav from "./components/nav/Nav"
import CreateActivity from "./views/createActivity/CreateActivity"
import Detail from "./views/detail/Detail"
import Activities from "./views/activities/Activities"
import UpdateActivityForm from "./components/forms/UpdateActivityForm"

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
        <Route path="activities" element={<Activities/>}/>
        <Route path="/activities/activity/:activityName" element={<UpdateActivityForm/>}/>
      </Routes>
    </div>
  )
}

export default App
