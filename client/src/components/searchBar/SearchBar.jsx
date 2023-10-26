import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { filterCountries, selectCountriesByName } from "../../redux/actions/actions"

const SearchBar = ({filters}) => {
    const dispatch = useDispatch()

    const [name, setName] = useState("")

    const handleChange = (event) => {
        setName(event.target.value)
        dispatch(selectCountriesByName(event.target.value || " ", filters))
    }

    useEffect(() => {
        setName("")
    }, [filters])

    return (
        <div>
            <input placeholder="Country Name" value={name} onChange={handleChange}/>
        </div>
    )
}

export default SearchBar