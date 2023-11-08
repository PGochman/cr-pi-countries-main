import { useState, useEffect } from "react"
import Select from "../select/Select"
import { useSelector } from "react-redux"
import style from "./form.module.css"
import axios from "axios"
import FunctionButton from "../buttons/FunctionButton"
import { useLocation } from 'react-router-dom'
import validation from "./validation"
import {seasons, difficulties} from "../../data/data"


const UpdateActivityForm = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activityToUpdate = JSON.parse(queryParams.get('activity'));

    const allCountries = useSelector((state) => state.allCountries)
    const [selectedCountries, setSelectedCountries] = useState(activityToUpdate.countries)
    const [country, setCountry] = useState({name: "", id: ""})
    const [allowed, setAllowed] = useState(true)
    const [deleteCountry, setDeleteCountry] = useState({name: "", id: ""})
    const [allowedDelete, setAllowedDelete] = useState(true)
    const [errors, setErrors] = useState({})
    const [activityUpdate, setActivityUpdate] = useState({
        name: activityToUpdate.name,
        difficulty: activityToUpdate.difficulty,
        season: activityToUpdate.season,
        duration: activityToUpdate.duration,
        countries: activityToUpdate.countries
    })
    const [submited, setSubmited] = useState(false)

    useEffect(() => {
        setActivityUpdate({
            ...activityUpdate,
            countries: selectedCountries
        })
    }, [selectedCountries])

    useEffect(() => {
        let equal = true
        for(let prop in activityUpdate){
            if(Array.isArray(activityUpdate[prop])){
                activityToUpdate[prop].map((param) => {
                    if(!activityUpdate[prop].includes(param)){
                        equal = false
                    }
                })

                activityUpdate[prop].map((param) => {
                    if(!activityToUpdate[prop].includes(param)){
                        equal = false
                    }
                })
            } else {
                if(activityUpdate[prop] != activityToUpdate[prop]){
                    equal = false
                }
            }
        }
        if(equal){
            setErrors({activity: "activities are the same"})
        } else {
            setErrors(validation(activityUpdate))
        }
    }, [activityUpdate])

    const addCountries = (event) => {
        event.preventDefault()
        setSelectedCountries((countries) => [...countries, country.id])
        setCountry({name: "", id: ""})
        setAllowed(true)
    }

    const deleteCountries = (event) => {
        event.preventDefault()
        
        setSelectedCountries(selectedCountries.filter((country) => deleteCountry.id !== country))
        setDeleteCountry({name: "", id: ""})
        setAllowedDelete(true)
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

    const handleDeleteCountry = (event) => {
        setDeleteCountry({name: event.target.value})
        const countryToDelete = allCountries.find((country) => country.name == event.target.value)
        if(countryToDelete){
            const countryId = activityUpdate.countries.find((country) => country == countryToDelete.id)
            if (countryId){
                setDeleteCountry({name: countryToDelete.name, id: countryId})
                setAllowedDelete(false)
            } else {
                setAllowedDelete(true)
            }
        } else{
            setAllowedDelete(true)
        }
    }

    const handleInput = (event) => {
        setActivityUpdate({
            ...activityUpdate,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        await axios.put("http://localhost:3001/activities", activityUpdate)
        setSubmited(true)
    }

    return(
        submited ? (
            <div className={style.updateForm}>
                <h1 className={style.updateSuccess}>Activity updated successfully</h1>
            </div>
        ) : (
            <div className={style.updateForm}>
                <form className={style.container} onSubmit={handleSubmit}>
                    <h1>{activityUpdate.name}</h1>

                    <hr style={{ borderStyle: "none"}} />

                    <p>Difficulty: </p>
                    {difficulties.map((difficulty) => {
                        return(
                            <div key={difficulty.words}>
                                <label htmlFor={difficulty.number}>{difficulty.words}</label>
                                <input key={difficulty.number /2 * 2} type="radio" name="difficulty" id={difficulty.number} value={difficulty.number} checked={activityUpdate.difficulty == difficulty.number} onChange={handleInput}></input>
                            </div>
                        )
                    })}
                    {errors.difficulty && <p className={style.error}>{errors.difficulty}</p>}

                    <hr style={{ borderStyle: "none"}} />

                    <label htmlFor="duration">Duration(hours)</label>
                    <input name="duration" type="number" value={activityUpdate.duration} onChange={handleInput} step={0.5} min={0.5} max={10} ></input>

                    <hr style={{ borderStyle: "none"}} />

                    <Select name="season" selected={activityUpdate.season} options={seasons} first="Choose a season" onChange={handleInput}/>
                    {errors.season && <p className={style.error}>{errors.season}</p>}

                    <hr style={{ borderStyle: "none"}} />

                    <label htmlFor="countries">add Countries (select one from the list): </label>
                    <input name="countries" type="text" list="countries" value={country.name} onChange={handleCountry}></input>
                    <datalist id="countries">
                        {allCountries.filter((country) => !selectedCountries.includes(country.id)).map((country) => {
                            return <option key={country.id} value={country.name}></option>
                        })}
                    </datalist>
                    <FunctionButton disabled={allowed} onClick={addCountries} name="Add"/>
                    {errors.countries && <p className={style.error}>{errors.countries}</p>}

                    <hr style={{ borderStyle: "none"}} />

                    <label htmlFor="countries">Eliminate Countries (select one from the list): </label>
                    <input name="countries" type="text" list="deleteCountries" value={deleteCountry.name} onChange={handleDeleteCountry}></input>
                    <datalist id="deleteCountries">
                        {allCountries.filter((country) => selectedCountries.includes(country.id)).map((country) => {
                            return <option key={country.id} value={country.name}></option>
                        })}
                    </datalist>
                    <FunctionButton disabled={allowedDelete} onClick={deleteCountries} name="Delete"/>
                    {errors.countries && <p className={style.error}>{errors.countries}</p>}

                    {errors.activity && <p className={style.error}>{errors.activity}</p>}

                    <button className={style.button} type="submit" disabled={errors.name || errors.activity || errors.difficulty || errors.season || errors.countries}>Update activity!</button>
                </form>
            </div>
        )
    )
}

export default UpdateActivityForm