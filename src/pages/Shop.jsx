import Collection from "../components/Collection"

function Shop() {
    return (
        <div className="mx-4">
            <h2 className='text-3xl my-5 text-zinc-100 uppercase font-bold tracking-tight'>Shop</h2>
            <div className="overflow-x-scroll">
                <div class="relative w-[550px]">
                    <div class="flex space-x-4 snap-x snap-mandatory overflow-x-auto no-scrollbar">
                        <div class="w-25 h-25 bg-white snap-center grid place-content-center">
                            <p className="text-2xl font-bold">Nike</p>
                        </div>
                        <div class="w-25 h-25 bg-white snap-center grid place-content-center">
                            <p className="text-2xl font-bold">Adidas</p>
                        </div>
                        <div class="w-25 h-25 bg-white snap-center grid place-content-center text-center">
                            <p className="text-2xl font-bold">New Balance</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;