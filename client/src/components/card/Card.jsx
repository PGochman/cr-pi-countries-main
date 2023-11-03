import {Link} from "react-router-dom"
import style from "./card.module.css"

const Card = ({flag, name, continent, id}) => {
    return (
        <Link to={`/countries/${id}`}>
            <div className={style.container}>
                <div className={style.description}>
                    <p>{name}</p>
                    <p>{continent}</p>
                </div>
                <img width="150px" className={style.image} src={flag}></img>
            </div>
        </Link>
    )
}

export default Card