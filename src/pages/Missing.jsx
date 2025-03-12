import { Link } from "react-router-dom"

function Missing() {
    return (
        <article className="flex flex-col items-center justify-center h-screen">
            <p className="text-3xl font-regular tracking-tight text-zinc-50 relative top-15">Opps! Page Not Found</p>
            <h1 className="relative left-[-20px] flex">
                <p className="text-[200px] font-black tracking-[-35px] relative z-0 text-green-500">4</p>
                <p className="text-[200px] font-outline-4 font-black tracking-[-35px] relative z-10 text-orange-500">0</p>
                <p className="text-[200px] font-outline-4 font-black tracking-[-35px] relative z-15 text-zinc-100">4</p>
            </h1>
            <Link to="/">
                <p className="text-zinc-50 relative bottom-10 duration-150 active:text-orange-500 z-16 animate-pulse">
                    Go back to Home
                </p>
            </Link>
        </article>
    )
}

export default Missing