import { Link } from "react-router-dom"
import style from "./button.module.css"

const LinkButton = ({path, name}) => {
    return (
        <Link to={path}><button className={style.button}>{name}</button></Link>
    )
}

export default LinkButton