import style from "./landing.module.css"
import { Link } from "react-router-dom"



const Landing = () => {
    return (
        <div className={style.div}>
            <div className={style.buttonDiv}>
                <Link to="/home">
                    <button className={style.button}>Home</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing