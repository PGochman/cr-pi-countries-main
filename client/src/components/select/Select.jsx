const Select = ({name, options, onChange, first}) => {
    return(
        <select name={name} onChange={onChange}>
            <option value="All">{first || "All"}</option>
            {options?.map((option) => {
                return <option key={option} value={option}>{option}</option>
            })}
        </select>
    )
}

export default Select