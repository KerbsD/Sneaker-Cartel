import Brand from "../components/Brand"

function Shop() {
    return (
        <div className="mx-4">
            <h2 className='text-3xl my-5 text-zinc-100 uppercase font-bold tracking-tight'>Shop</h2>
            <div className="overflow-x-scroll">
                <div class="relative inline-block">
                    <div class="flex gap-3 no-scrollbar">
                        <Brand brand={"Nike"} />
                        <Brand brand={"Adidas"} />
                        <Brand brand={"New Balance"} />
                        <Brand brand={"Asics"} />
                        <Brand brand={"Onitsuka"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;