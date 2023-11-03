import style from "./button.module.css"

const FunctionButton = ({onClick, name, text, disabled}) => {
    return (
        <button className={style.button} disabled={disabled} name={name} onClick={onClick}>{text || name}</button>
    )
}

export default FunctionButton