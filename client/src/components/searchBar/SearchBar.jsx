import { useDispatch, useSelector } from "react-redux"
import { selectCountriesByName, setCurrentName } from "../../redux/actions/actions"
import style from "./searchBar.module.css"
import closeButton from "../../assets/closeButton2.png"

const SearchBar = ({filters}) => {
    const dispatch = useDispatch()

    const name = useSelector((state) => state.currentName)

    const handleChange = (event) => {
        dispatch(setCurrentName(event.target.value))
        dispatch(selectCountriesByName(event.target.value || " ", filters))
    }

    const eraseName = () => {
        dispatch(setCurrentName(""))
        dispatch(selectCountriesByName(" ", filters))
    }

    return (
        <div className={style.div}>
            <input className={style.input} placeholder="Country Name" value={name} onChange={handleChange}/>
            <button className={style.button} onClick={eraseName}><img src={closeButton}></img></button>
        </div>
    )
}

export default SearchBar