import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useScrollPosition from '../hooks/useScrollPosition';
import useLogout from '../hooks/useLogout';

function Navbar() {
    const logout = useLogout();
    const navigate = useNavigate();
    const scrollPosition = useScrollPosition();
    const [isScroll, setIsScroll] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(prevShow => !prevShow);
    };

    useEffect(() => {
        scrollPosition > 0 ? setIsScroll(true) : setIsScroll(false);
    }, [scrollPosition]);

    const logOut = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <>
            <nav className={isScroll ? "sticky duration-300 w-full top-0 left-0 bg-zinc-50 flex justify-between items-center p-3" : " w-full top-0 left-0 flex justify-between items-center px-3 py-7 duration-300"}>
                <div>
                    <img onClick={toggleMenu} src="/resources/hamburger.svg" className='w-9 h-9 bg-zinc-50 rounded-xs' alt="" />
                </div>
                <Link to="/">
                    <div className={isScroll ? "text-zinc- text-2xl text-center" : "text-zinc-50 text-2xl"}>Sneaker Cartel</div>
                </Link>
                <div className="flex items-center gap-3">
                    <p onClick={logOut} className={isScroll ? "text-zinc-950" : "text-zinc-50"}>Logout</p>
                </div>
            </nav>

            <div className={isOpen ? 'w-screen h-screen bg-white top-0 duration-200 sticky' : 'w-0 h-screen absolute bg-white top-0 duration-200'}>
                <div className={isOpen ? "block" : "hidden"}>
                    <img onClick={toggleMenu} src="/resources/close.svg" className='w-9 h-9 bg-zinc-50 rounded-xs p-1 relative top-0 right-0' alt="" />
                    <p className='text-center text-lg'>Hello World</p>
                </div>
            </div>
        </>
    )
}

export default Navbar;