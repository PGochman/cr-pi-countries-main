import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { cleanDetail, getDetail } from "../../redux/actions/actions"
import { useEffect, useState } from "react"
import style from "./detail.module.css"

const difficulties = {
    1: "Very easy",
    2: "Easy",
    3: "Medium",
    4: "Hard",
    5: "Very hard"
}

const Detail = () => {
    const {countryId} = useParams()
    const countryDetail = useSelector((state) => state.countryDetail)
    const [id, setId] = useState(countryId)
    const [showActivities, setShowActivities] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        setId(countryId)
        return eraseDetail
    }, [])

    useEffect(() => {
        dispatch(getDetail(id))
    }, [id])

    const eraseDetail = () => {
        dispatch(cleanDetail())
    }

    const handleActivities = () => {
        setShowActivities(!showActivities)
    }

    return (
        <div>
            {countryDetail ? (
                Object.keys(countryDetail).length !== 0 ? (
                    <div  className={style.div}>
                        <div className={style.detail}>
                            <h1>{countryDetail.name}({countryDetail.id})</h1>
                            <img className={style.flag} src={countryDetail.flag} alt={countryDetail.name} />
                            <h3>Continent: {countryDetail.continent}</h3>
                            {countryDetail.subregion && 
                                <h3>Sub region: {countryDetail.subregion}</h3>
                            }
                            {countryDetail.capital && 
                                <h3>Capital: {countryDetail.capital}</h3>
                            }
                            <h3>Area: {countryDetail?.area} km2</h3>
                            <h3>Population: {countryDetail.population} people</h3>
                        </div>
                        {countryDetail.activities.length ? (
                            <div className={style.activities}>
                            <h2>Activities to do: </h2>
                            {countryDetail?.activities?.map((activity) => {
                                return (
                                    <div className={style.activity} key={activity.id}>
                                        <h2>{activity.name}</h2>
                                        <h3>Season: {activity.season}</h3>
                                        {activity.duration &&
                                            <h3>Aproximate duration: {activity.duration} hours</h3>
                                        }
                                        <h3>Difficulty: {difficulties[activity.difficulty]}</h3>
                                    </div>
                                ) 
                            })}
                            </div>
                        ) : (
                            <div className={style.noActivities}>
                                <h1>The country has no activities associated</h1>
                                <h2>Press the create activity button above to create one!</h2>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                )
            ) : (
                <h1>Country not found</h1>
            )}
                
        </div>
    )
}

export default Detail