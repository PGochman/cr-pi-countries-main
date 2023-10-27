import LinkButton from "../buttons/LinkButton"
import { useLocation } from "react-router-dom"

const Nav = () => {

    const {pathname} = useLocation()

    return (
        <nav>
            <LinkButton path="home" name="Home"></LinkButton>
            {pathname !== "/create" && <LinkButton path="create" name="Create activity"/>}
        </nav>
    )
}

export default Nav