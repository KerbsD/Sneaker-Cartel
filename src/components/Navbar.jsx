import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavLink from './NavLink';
import useScrollPosition from '../hooks/useScrollPosition';

function Navbar() {
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
        navigate('/');
    }

    return (
        <div className='w-screen fixed z-50 md:top-0 md:left-0'>
            <nav className={isScroll ? "sticky duration-300 w-full top-0 left-0 bg-zinc-50 flex justify-between items-center p-3 md:px-40 md:justify-between" : " w-full top-0 left-0 flex justify-between items-center px-3 py-7 duration-300 md:px-40 md:justify-between md:py-15"}>
                <div className='md:hidden'>
                    <img onClick={toggleMenu} src="/resources/hamburger.svg" className='w-9 h-9 bg-zinc-50 rounded-xs' alt="" />
                </div>
                <Link to="/home">
                    {isScroll ? <div className="text-2xl text-center tracking-tight md:text-4xl duration-300 text-orange-500 inset-x-0"><b className='text-green-500'>Sneaker</b> Cartel</div> : <div><img src="/resources/home-logo.png" className='w-[150px] translate-x-[18px] duration-300 inset-x-0' alt="" /></div>}
                </Link>
                <div className='hidden md:flex md:flex-row md:gap-14 md:-inset-0-x'>
                    <NavLink isScroll={isScroll} link="/home" label="Home" />
                    <NavLink isScroll={isScroll} link="/shop" label="Shop" />
                    <NavLink isScroll={isScroll} link="/blog" label="Blog" />
                    <NavLink isScroll={isScroll} link="/lookbook" label="Lookbook" />
                </div>
                <div className="flex items-center justify-center gap-3">
                    <Link to="/cart">
                        <img src="/resources/cart.svg" className={isScroll ? 'w-8 h-8' : 'w-8 h-8 invert'} alt="" />
                    </Link>
                    <Link to="/profile">
                        <img src="/resources/user.svg" className={isScroll ? 'w-8 h-8' : 'w-8 h-8 invert'} alt="" />
                    </Link>
                </div>
            </nav>

            {/* For mobile menu bar */}
            <div className={isOpen ? 'w-screen h-screen bg-zinc-50 top-0 duration-200 fixed' : 'w-0 h-screen bg-zinc-50 top-0 duration-200 fixed'}>
                <div className={isOpen ? "block" : "hidden"}>
                    <img onClick={toggleMenu} src="/resources/close.svg" className='w-9 h-9 mx-5 my-10 bg-zinc-50 rounded-xs p-1 top-0 right-0.5 relative' alt="" />
                    <div onClick={toggleMenu}>
                        <NavLink link="/home" label="Home" />
                        <NavLink link="/shop" label="Shop" />
                        <NavLink link="/blog" label="Blog" />
                        <NavLink link="/lookbook" label="Lookbook" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;