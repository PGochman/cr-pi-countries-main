import LinkButton from "../buttons/LinkButton"
import { useLocation } from "react-router-dom"
import style from "./nav.module.css"

const Nav = () => {

    const {pathname} = useLocation()

    return (
        <nav className={style.nav}>
            <LinkButton path="home" name="Home"></LinkButton>
            {pathname !== "/create" && <LinkButton path="create" name="Create activity"/>}
            <LinkButton path="activities" name="Activities"/>
        </nav>
    )
}

export default Nav