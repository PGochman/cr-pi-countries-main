import { seasons} from "../../data/data"

const validation = (activity) => {
    const errors = {}

    if(activity.name){
        if(!(/^[A-Za-z\s]+$/).test(activity.name)){
            errors.name = "Invalid activity name"
        }
    } else{
        errors.name = "Required field"
    }

    if(!seasons.includes(activity.season)){
        errors.season = "Must select a season"
    }

    if(!activity.difficulty){
        errors.difficulty = "Select a difficulty"
    }

    if(!activity.countries || !activity.countries.length){
        errors.countries = "Add at least one country"
    }

    return errors
}

export default validation