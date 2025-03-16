import { Outlet } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

function PageLayout(props) {
    return (
        <div className='scroll-smooth'>
            <div className='h-[10vh] snap-start'>
                <Navbar />
                {props.extra}
            </div>
            <Outlet />
            <div className='mt-20'>
                <Footer />
            </div>
        </div>
    )
}

export default PageLayout;