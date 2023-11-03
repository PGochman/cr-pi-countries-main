import { useDispatch, useSelector } from "react-redux"
import { selectCountriesByName, setCurrentName } from "../../redux/actions/actions"
import style from "./searchBar.module.css"

const SearchBar = ({filters}) => {
    const dispatch = useDispatch()

    const name = useSelector((state) => state.currentName)

    const handleChange = (event) => {
        dispatch(setCurrentName(event.target.value))
        dispatch(selectCountriesByName(event.target.value || " ", filters))
    }

    return (
        <div>
            <input className={style.input} placeholder="Country Name" value={name} onChange={handleChange}/>
        </div>
    )
}

export default SearchBar