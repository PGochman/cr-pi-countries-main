import {Link} from "react-router-dom"

const Card = ({flag, name, continent, id}) => {
    return (
        <Link to={`/countries/${id}`}>
            <div>
                <h1>Name: {name}, continent: {continent}</h1>
                <img src={flag}></img>
            </div>
        </Link>
    )
}

export default Card