import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Select = ({name, options, onChange, first, selected}) => {

    return(
        <select name={name} onChange={onChange} value={selected || "All"}>
            <option key={name} value="All">{first || "All"}</option>
            {options?.map((option) => {
                return <option key={option} value={option}>{option}</option>
            })}
        </select>
    )
}

export default Select