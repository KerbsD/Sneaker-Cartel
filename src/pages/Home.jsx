import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import Navbar from "../components/Navbar"

function Home() {
    const navigate = useNavigate();
    const logout = useLogout();

    return (
        <div className='h-[1500px] scroll-smooth'>
            <Navbar />
        </div>
    )
}

export default Home;