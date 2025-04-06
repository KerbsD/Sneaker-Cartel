import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Banner = (props) => {
    return (
        <div className="p-2 border border-zinc-100 rounded-md gap-2 bg-zinc-50 flex items-center shadow-amber-700 drop-shadow-lg">
            <div className="w-10 h-10 grid place-items-center bg-orange-400 rounded-full mx-2">
                <FontAwesomeIcon size="lg" icon={props.icon} inverse />
            </div>
            <div>
                <p className="text-base font-light text-green-600">{props.label}</p>
                <p className="text-lg font-semibold"><span className="">{props.content}</span></p>
            </div>
        </div>
    )
}

export default Banner;