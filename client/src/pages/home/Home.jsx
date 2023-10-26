import SearchBar from "../../components/searchBar/SearchBar"
import { useSelector, useDispatch } from "react-redux"
import Cards from "../../components/cards/Cards"
import Select from "../../components/select/Select"
import { useEffect, useState } from "react"
import { orderCountries, filterCountries } from "../../redux/actions/actions"
import FunctionButton from "../../components/buttons/FunctionButton"

const Home = () => {
    const [allActivitiesNames, setAllActivitiesNames] = useState([]);
    const [activityCountries, setActivityCountries] = useState({})
    const [subContinents, setSubContinents] = useState({})
    const [showSubContinents, setShowSubContinents] = useState(false)
    const dispatch = useDispatch()
    const [order, setOrder] = useState({})
    const [filters, setFilters] = useState({})
    const {activities, continents} = useSelector((state) => state)

    useEffect(() => {
        const obj = {}
        activities.map((activity) => {
            setAllActivitiesNames((allNames) => [...allNames, activity.name])
            obj[activity.name] = activity.countries
        })
        setActivityCountries(obj)
    }, [])

    useEffect(() => {
        dispatch(orderCountries(order))
    }, [order])

    useEffect(() => {
        dispatch(filterCountries(filters))
    }, [filters])

    const handleContinentChange = (event) => {
        if(continents[event.target.value] && continents[event.target.value][0]){
            setShowSubContinents(true)
            setSubContinents(continents[event.target.value])
        } else {
            setShowSubContinents(false)
        }
        setFilters({...filters, continent: event.target.value, subregion: null})
    }   

    const handleOrder = (event) => {
        setOrder({ascendant: true, parameter: event.target.value})
    }

    const changeOrder = () => {
        setOrder({...order, ascendant: !order.ascendant})
    }

    const handleActivityChange = (event) => {
        setFilters({...filters, id: activityCountries[event.target.value]})
    }

    const handleSubContinent = (event) => {
        setFilters({...filters, subregion: event.target.value})
    }

    
    return (
      <div>
        <SearchBar filters={filters}/>
        <Select name="activity" onChange={handleActivityChange} options={allActivitiesNames}/>
        <Select name="continent" options={Object.keys(continents)} onChange={handleContinentChange}/>
        {showSubContinents && <Select name="SubContinents" options={subContinents} onChange={handleSubContinent}/>}
        <Select name="order" options={["name", "population"]} first={"Parameter"} onChange={handleOrder} />
        {order.parameter && <FunctionButton name="change order" onClick={changeOrder}></FunctionButton>}
        <Cards order={order}/>
      </div>
    );
}

export default Home