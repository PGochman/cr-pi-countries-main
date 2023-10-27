const validation = (activity) => {
    const errors = {}
    const seasons = ["Summer", "Winter", "Fall", "Spring"]

    if(activity.name){
        if(!(/^[A-Za-z]+$/).test(activity.name)){
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