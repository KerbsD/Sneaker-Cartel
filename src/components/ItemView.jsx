import { useState, useEffect } from "react";

function ItemView(props) {
    const [isSoldout, setIsSoldout] = useState(false)

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className={isSoldout ? "absolute" : "hidden"}>
                <p className="px-2 py-3.5 leading-3 text-sm text-center tracking-tight uppercase bg-orange-400 rounded-full text-zinc-100">Sold <br />Out</p>
            </div>
            <div className="p-2 w-full h-full bg-zinc-100 rounded-sm flex flex-col">
                <img src={props.Ipath} className="w-full" alt="" />
                <div className="mt-auto">
                    <div className="flex flex-col px-1">
                        <h2 className="text-base font-semibold">{props.Ibrand}</h2>
                        <p className="text-lg tracking-wide">{props.Iname}</p>
                        <p className="text-base font-light">P {new Intl.NumberFormat('en-US').format(props.Iprice)}</p>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default ItemView;