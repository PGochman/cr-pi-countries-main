import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetail } from "../../redux/actions/actions"
import { useEffect } from "react"

const Detail = () => {
    const {id} = useParams()
    const countryDetail = useSelector((state) => state.countryDetail)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(id))
    }, [id])

    return (
        <div>
            <h1>{countryDetail.name}({countryDetail.id})</h1>
            <img src={countryDetail.flag} alt={countryDetail.name} />
            <h3>{countryDetail.continent}</h3>
            <h3>{countryDetail.capital}</h3>
            <h3>{countryDetail?.subregion}</h3>
            <h3>{countryDetail?.area}</h3>
            <h3>{countryDetail.population}</h3>
            {countryDetail?.activities?.map((activity) => {
                return <h3 key={activity.id}>{activity?.name}</h3>
            })}
        </div>
    )
}

export default Detail