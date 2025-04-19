const ShipRadBtn = (props) => {
    return (
        <div
            onClick={props.onClick}
            className={props.label == props.method ? "border border-orange-500 rounded-md px-3 py-2 mt-3 mb-2 bg-stone-100/10 duration-150" : "border border-stone-100/25 rounded-md px-3 py-2 mt-3 mb-2 duration-150"}
        >
            <label
                className="text-stone-100 font-medium ml-2"
                htmlFor="COD"
            >
                {props.label}
            </label>
        </div>
    )
}



export default ShipRadBtn;