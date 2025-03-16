import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import ItemView from '../components/ItemView';

function Home() {
    return (
        <>
            <div className="h-screen">
                <Carousel />
            </div>
            <div className=''>
                <h2 className='text-3xl text-center text-zinc-100 my-5 tracking-wide uppercase font-bold'>Products</h2>
                <div className='grid grid-cols-2 mx-4 gap-4 md:grid-cols-3 place-items-strech md:mx-0'>
                    <ItemView Ipath={"/items/samba.png"} Ibrand={"Adidas"} Iname={"OG Beigh"} Iprice={"P10,XXX"} />
                    <ItemView Ipath={"/items/550.png"} Ibrand={"New Balance"} Iname={'"Green"'} Iprice={"P15,XXX"} />
                    <ItemView Ipath={"/items/panda.png"} Ibrand={"SB Dunks"} Iname={"Panda"} Iprice={"P20,XXX"} />
                    <ItemView Ipath={"/items/samba.png"} Ibrand={"Adidas"} Iname={"OG Beigh"} Iprice={"P10,XXX"} />
                    <ItemView Ipath={"/items/550.png"} Ibrand={"New Balance"} Iname={'"Green"'} Iprice={"P15,XXX"} />
                    <ItemView Ipath={"/items/panda.png"} Ibrand={"SB Dunks"} Iname={"Panda"} Iprice={"P20,XXX"} />
                    <ItemView Ipath={"/items/samba.png"} Ibrand={"Adidas"} Iname={"OG Beigh"} Iprice={"P10,XXX"} />
                    <ItemView Ipath={"/items/550.png"} Ibrand={"New Balance"} Iname={'"Green"'} Iprice={"P15,XXX"} />
                    <ItemView Ipath={"/items/panda.png"} Ibrand={"SB Dunks"} Iname={"Panda"} Iprice={"P20,XXX"} />
                    <ItemView Ipath={"/items/550.png"} Ibrand={"New Balance"} Iname={'"Green"'} Iprice={"P15,XXX"} />
                    <ItemView Ipath={"/items/panda.png"} Ibrand={"SB Dunks"} Iname={"Panda"} Iprice={"P20,XXX"} />
                    <ItemView Ipath={"/items/panda.png"} Ibrand={"SB Dunks"} Iname={"Panda"} Iprice={"P20,XXX"} />
                </div>
            </div>
        </>
    )
}

export default Home;