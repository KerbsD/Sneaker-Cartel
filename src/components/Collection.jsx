function Collection(props) {
    return (
        <div className="w-full h-60 relative bg-zinc-950/45 rounded-sm bg-cover bg-center overflow-hidden">
            <img src={props.Sbg} alt="" className="absolute -z-10 -inset-y-15"/>
            <div className="mx-auto flex flex-col justify-center items-center h-full z-10">
                <p className="text-xl tracking-widest font-black text-zinc-100">{props.Sbrand}</p>
                <p className="text-base underline font-light text-zinc-100">View Products</p>
            </div>
        </div>  

    )
}

export default Collection;