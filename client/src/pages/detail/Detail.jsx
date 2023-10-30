import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { cleanDetail, getDetail } from "../../redux/actions/actions"
import { useEffect, useState } from "react"

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
                    <div>
                    <h1>Name: {countryDetail.name}({countryDetail.id})</h1>
                    <img src={countryDetail.flag} alt={countryDetail.name} />
                    <h3>Continent: {countryDetail.continent}</h3>
                    {countryDetail.capital ? (
                        <h3>Capital: {countryDetail.capital}</h3>
                    ) : (
                        <></>
                    )}
                    {countryDetail.subregion ? (
                        <h3>Sub region: {countryDetail.subregion}</h3>
                    ) : (
                        <></>
                    )}
                    <h3>Area: {countryDetail?.area} km2</h3>
                    <h3>Population: {countryDetail.population} people</h3>
                    {showActivities ? (
                        <div>
                        <h2>Activities to do: </h2>
                        {countryDetail?.activities?.map((activity) => {
                            return (
                                <div key={activity.id}>
                                    <h3>Name: {activity.name}</h3>
                                    <h3>Season: {activity.season}</h3>
                                    <h3>Aproximate duration: {activity.duration} hours</h3>
                                    <h3>Difficulty (on a scale from 1 to 5): {activity.difficulty}</h3>
                                    <h3></h3>
                                </div>
                            ) 
                        })}
                        <button onClick={handleActivities}>Hide activity info</button>
                        </div>
                    ) : (
                        <button onClick={handleActivities}>Show activity info</button>
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