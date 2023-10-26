const FunctionButton = ({onClick, name, text, disabled}) => {
    return (
        <button disabled={disabled} name={name} onClick={onClick}>{text || name}</button>
    )
}

export default FunctionButton