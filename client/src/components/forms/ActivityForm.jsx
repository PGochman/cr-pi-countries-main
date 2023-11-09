import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import FunctionButton from "../buttons/FunctionButton"
import { addActivity, getData } from "../../redux/actions/actions"
import Select from "../select/Select"
import validation from "./validation"
import style from "./form.module.css"
import {seasons, difficulties} from "../../data/data"

const ActivityForm = () => {

    const [activity, setActivity] = useState({name: "", difficulty: "", duration: "", season: ""})
    const dispatch = useDispatch()

    const allCountries = useSelector((state) => state.allCountries)
    const [selectedCountries, setSelectedCountries] = useState([])
    const [country, setCountry] = useState({name: "", id: ""})
    const [allowed, setAllowed] = useState(true)
    const [errors, setErrors] = useState({})
    const [createError, setCreateError] = useState("")
    const [submited, setSubmited] = useState(false)

    useEffect(() => {
        setActivity({
            ...activity,
            countries: selectedCountries
        })
    }, [selectedCountries])

    useEffect(() => {
        setErrors(validation(activity))
    }, [activity])

    const handleInput = (event) => {
        setActivity({
            ...activity,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if(typeof(createError) !== "string"){
            setSelectedCountries([])
            setActivity({name: "", difficulty: "", duration: "", season: ""})
        }
    }, [createError])

    const addCountries = (event) => {
        event.preventDefault()
        setSelectedCountries((countries) => [...countries, country.id])
        setCountry({name: "", id: ""})
        setAllowed(true)
    }

    const handleCountry = (event) => {
        setCountry({name: event.target.value})
        const countryId = allCountries.find((country) => country.name == event.target.value)
        if (countryId){
            setCountry({name: countryId.name, id: countryId.id})
            setAllowed(false)
        } else {
            setAllowed(true)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmited(true)
        dispatch(addActivity(activity)).then((error) => {
            setCreateError(error)
        })
    }

    const handleGoBack = () =>{
        setSubmited(false)
    }  

    return (
        submited ? (
            <div>
                {typeof(createError) == "string" ? (
                    <div className={style.submited}>
                        <p>{createError}</p>
                        <FunctionButton onClick={handleGoBack} name="Try again" />
                    </div>
                ) : (
                    <div className={style.submited}>
                        <p>{createError.payload}</p>
                        <FunctionButton onClick={handleGoBack} name="Create a new one" />
                    </div>
                )}
            </div>
        ) : (
        <form className={style.container} onSubmit={handleSubmit}>
            <label htmlFor="name">Activity name:</label>
            <input autoComplete="off" name="name" type="text" value={activity.name} onChange={handleInput}></input>
            {errors.name && <p className={style.error}>{errors.name}</p>}

            <hr style={{ borderStyle: "none"}} />

            <p>Difficulty: </p>
            {difficulties.map((difficulty) => {
                return(
                    <div key={difficulty.words}>
                        <label htmlFor={difficulty.number}>{difficulty.words}</label>
                        <input key={difficulty.number /2 * 2} type="radio" name="difficulty" id={difficulty.number} value={difficulty.number} checked={activity.difficulty == difficulty.number} onChange={handleInput}></input>
                    </div>
                )
            })}
            {errors.difficulty && <p className={style.error}>{errors.difficulty}</p>}

            <hr style={{ borderStyle: "none"}} />

            <label htmlFor="duration">Duration(hours)</label>
            <input name="duration" type="number" value={activity.duration} onChange={handleInput} step={0.5} min={0.5} max={10} ></input>

            <hr style={{ borderStyle: "none"}} />

            <Select name="season" selected={activity.season} options={seasons} first="Choose a season" onChange={handleInput}/>
            {errors.season && <p className={style.error}>{errors.season}</p>}

            <hr style={{ borderStyle: "none"}} />

            <label htmlFor="countries">Countries (select one from the list): </label>
            <input name="countries" type="text" list="countries" value={country.name} onChange={handleCountry}></input>
            <datalist id="countries">
                {allCountries.filter((country) => !selectedCountries.includes(country.id)).map((country) => {
                    return <option key={country.id} value={country.name}></option>
                })}
            </datalist>
            <FunctionButton disabled={allowed} onClick={addCountries} name="Add"/>
            {errors.countries && <p className={style.error}>{errors.countries}</p>}

            <hr style={{ borderStyle: "none"}} />

            <button className={style.button} type="submit" disabled={errors.name || errors.difficulty || errors.season || errors.countries}>Create activity!</button>
        </form>
            
        )
        
    )
}

export default ActivityForm