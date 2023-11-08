import ActivityForm from "../../components/forms/ActivityForm"
import style from "./createactivity.module.css"

const CreateActivity = () => {
    return (
        <div className={style.div}>
            <h1>Create activity</h1>
            <ActivityForm></ActivityForm>
        </div>
    )
}
export default CreateActivity