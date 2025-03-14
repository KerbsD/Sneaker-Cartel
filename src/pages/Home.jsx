import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import ItemView from '../components/ItemView';

function Home() {
    const navigate = useNavigate();
    const logout = useLogout();

    return (
        <div className='scroll-smooth snap-y'>
            <div className='h-screen snap-start'>
                <Navbar />
                <Carousel />
            </div>
            <div className='mt-20'>
                <h2 className='text-3xl text-center text-zinc-100 my-5 tracking-wide uppercase font-bold'>Products</h2>
                <div className='grid grid-cols-1 mx-4 gap-4 md:grid-cols-3 place-items-strech md:mx-0'>
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
            <div className='mt-20'>
                <Footer/>
            </div>
        </div>
    )
}

export default Home;