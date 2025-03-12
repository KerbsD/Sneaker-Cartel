import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Input(props) {
    return <>
        <label className="text-base text-zinc-50" htmlFor={props.name}>
            {props.label}
            <div className={props.inLog ? "hidden" : "inline-block"}>
                <FontAwesomeIcon icon={faCheck} className={props.classcont ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={props.classcont || !props.value ? "hide" : "invalid"} />
            </div>
        </label>
        <input
            className="bg-zinc-50 py-2 px-3 caret-green-600 focus:border-green-600 border-2 outline-none rounded-lg"
            type={props.type}
            id={props.name}
            ref={props.turo}
            autoComplete={props.autocompt}
            onChange={props.onChange}
            value={props.value}
            required
            aria-invalid={props.classcont ? "false" : "true"}
            aria-describedby={props.note}
            onFocus={props.onfocus}
            onBlur={props.onblur}
            {...props.attribs}
        />
        <p id={props.note} className={props.focus && props.value && !props.classcont ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            {props.desc}
        </p>
    </>
}

export default Input;