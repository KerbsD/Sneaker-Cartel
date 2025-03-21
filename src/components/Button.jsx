function Button(props) {
    return (
        <button onClick={props.onclick} className={"text-xl py-2 rounded-3xl font-outfit font-bold tracking-wide " + props.style} disabled={props.disabled}>{props.label}</button>
    );
}

export default Button;