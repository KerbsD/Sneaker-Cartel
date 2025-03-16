import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import Collection from "../components/Collection"

function Shop() {
    return (
        <div className="mt-20 mx-4">
            <h2 className='text-3xl text-center text-zinc-100 my-5 tracking-wide uppercase font-bold'>Collections</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Collection Sbrand={"All Collection"} Sbg={"/resources/all.png"} />
                <Collection Sbrand={"Nike"} Sbg={"/items/panda.png"} />
                <Collection Sbrand={"New Balance"} Sbg={"/items/550.png"} />
                <Collection Sbrand={"Adidas"} Sbg={"/items/samba.png"} />
            </div>
        </div>
    )
}

export default Shop;