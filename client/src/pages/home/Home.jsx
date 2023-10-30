import SearchBar from "../../components/searchBar/SearchBar"
import { useSelector, useDispatch } from "react-redux"
import Cards from "../../components/cards/Cards"
import Select from "../../components/select/Select"
import { useEffect, useState } from "react"
import { orderCountries, filterCountries, getData, setFilters, setCurrentActivity, setOrder } from "../../redux/actions/actions"
import FunctionButton from "../../components/buttons/FunctionButton"

const Home = () => {
    const [allActivitiesNames, setAllActivitiesNames] = useState([]);
    const [activityCountries, setActivityCountries] = useState({})
    const [subContinents, setSubContinents] = useState({})
    const [showSubContinents, setShowSubContinents] = useState(false)
    const dispatch = useDispatch()
    const {activities, continents, filters, currentActivity, order} = useSelector((state) => state)

    useEffect(() => {
        dispatch(getData())
        dispatch(filterCountries())
    }, [])

    useEffect(() => {
        const obj = {}
        const allActivities = []
        activities.map((activity) => {
            allActivities.push(activity.name)
            obj[activity.name] = activity.countries
        })
        setAllActivitiesNames(allActivities)
        setActivityCountries(obj)
    }, [activities])

    useEffect(() => {
        dispatch(orderCountries())
    }, [order])

    useEffect(() => {
        dispatch(filterCountries())
    }, [filters])

    useEffect(() => {
        if((continents[filters.continent] && continents[filters.continent][0])){
            setShowSubContinents(true)
            setSubContinents(continents[filters.continent])
        } else {
            setShowSubContinents(false)
        }
    }, [filters.continent])

    const handleContinentChange = (event) => {
        dispatch(setFilters({...filters, continent: event.target.value, subregion: null}))
    }   

    const handleOrder = (event) => {
        dispatch(setOrder({ascendant: true, parameter: event.target.value}))
    }

    const changeOrder = () => {
        dispatch(setOrder({...order, ascendant: !order.ascendant}))
    }

    const handleActivityChange = (event) => {
        dispatch(setCurrentActivity(event.target.value))
        dispatch(setFilters({...filters, id: activityCountries[event.target.value]}))
    }

    const handleSubContinent = (event) => {
        dispatch(setFilters({...filters, subregion: event.target.value}))
    }

    const eraseFilters = () => {
        dispatch(setCurrentActivity(""))
        dispatch(setFilters({}))
    }
    
    return (
      <div>
        <SearchBar filters={filters}/>
        <Select selected={currentActivity} name="activity" onChange={handleActivityChange} options={allActivitiesNames}/>
        <Select selected={filters.continent} name="continent" options={Object.keys(continents)} onChange={handleContinentChange}/>
        {showSubContinents && <Select selected={filters.subContinents} name="SubContinents" options={subContinents} onChange={handleSubContinent}/>}
        <FunctionButton onClick={eraseFilters} name="Erase filters"/>
        <Select name="order" selected={order.parameter} options={["name", "population"]} first={"Parameter"} onChange={handleOrder} />
        {order.parameter && <FunctionButton name="change order" onClick={changeOrder}></FunctionButton>}
        <Cards/>
      </div>
    );
}

export default Home