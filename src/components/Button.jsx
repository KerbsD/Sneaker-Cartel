function Button(props) {
    return (
        <button onClick={props.onclick} className={"text-xl py-2 rounded-3xl " + props.style} disabled={props.disabled}>
            {
                !props.loading
                    ?
                    <p className="font-bold tracking-wide">{props.label}</p>
                    :
                    <div className="w-6 h-6 mx-auto border-4 border-t-green-600 animate-spin rounded-full my-0.5"></div>
            }
        </button>
    );
}

export default Button;