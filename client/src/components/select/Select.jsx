const Select = ({name, options, onChange, first, selected}) => {

    return(
        <select name={name} onChange={onChange} value={selected || first || "All"}>
            <option key={first || name} value="All">{first || "All"}</option>
            {options?.map((option) => {
                return <option key={option} value={option}>{option}</option>
            })}
        </select>
    )
}

export default Select