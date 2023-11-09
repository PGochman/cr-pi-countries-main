import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getData } from "../../redux/actions/actions"
import axios from "axios"
import style from "./activities.module.css"
import LinkButton from "../../components/buttons/LinkButton"
import FunctionButton from "../../components/buttons/FunctionButton"
import { difficulties } from "../../data/data"

const Activities = () => {

    const {activities, allCountries} = useSelector((state) => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getData())
    }, [])

    const eliminateActivity = async(activity) => {
        await axios.delete("http://localhost:3001/activities", {
            data: activity
        })
        dispatch(getData())
    }

    return(
        <div className={style.activities}>
            <h1>Activities:</h1>
            <div className={style.activitiesContainer}>
                {activities.map((activity) => {
                    return (
                        <div key={activity.id} className={style.activity}>
                            <h1 key={activity.name}>{activity.name}</h1>
                            <p key={activity.difficulty}>Difficulty: {difficulties[activity.difficulty].words}</p>
                            {activity.duration && <p key={activity.duration * 100}>Durationn: {activity.duration} hours</p>}
                            <p key={activity.season}>Season: {activity.season}</p>
                            <p className={style.p}>Countries to do it:</p>
                            <div>
                                {(allCountries.filter((country) => activity.countries.includes(country.id))).map((country) => {
                                    return <span key={country.id}>{country.name} </span>
                                })}
                            </div>
                            <div>
                                <LinkButton path={`activity/${activity.name}?activity=${JSON.stringify(activity)}`} name="Update activity"/>
                                <FunctionButton onClick={() => eliminateActivity(activity)} name="Eliminate activity" />
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Activities