import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import Banner from '../components/Banner';
import { faPhone, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { IoLocationOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Profile() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const logout = useLogout();
    const [showAddress, setShowAddress] = useState(false);
    const [address, setAddress] = useState(auth.address)

    const addressField = address?.split(", ");


    const handleAddress = () => {
        setShowAddress(!showAddress);
    }

    const logOut = async () => {
        await logout();
        navigate('/');
    };

    const InputComp = (props) => {
        return <input readOnly value={props.value} type={props.type} placeholder={props.placeholder} className={`w-full border-2 border-b-orange-500 border-t-0 border-l-0 border-r-0 px-3 py-1 outline-none ${props.style}`} />
    }

    return (
        <div className="mx-4 h-screen gap-3 flex flex-col">
            <h1 className='text-2xl text-zinc-100 my-5 tracking-wide uppercase font-bold'>Profile</h1>
            <h1 className="text-center my-10 text-2xl font-light text-zinc-50">Hello, <span className="font-bold">{auth.fullname.split(" ")[0]}</span> </h1>
            <Banner icon={faUser} label={"Fullname:"} content={auth.fullname} />
            <Banner icon={faPhone} label={"Mobile Number:"} content={auth.number} />
            <Banner icon={faEnvelope} label={"Email:"} content={auth.mail} />
            <div className="p-2 border border-zinc-100 rounded-md gap-2 bg-zinc-50 flex items-center shadow-amber-700 drop-shadow-lg">
                <div className="w-10 h-10 grid place-items-center bg-orange-400 rounded-full mx-2">
                    <IoLocationOutline size={30} className='invert' />
                </div>
                <div className='flex justify-between w-full items-center'>
                    <div>
                        <p className="text-base font-light text-green-600">Shipping Address</p>
                        <p className="text-base font-light text-zinc-900">{address ? address : "No Address Set"}</p>
                    </div>
                    {
                        showAddress ? <IoChevronUp onClick={() => handleAddress()} size={25} className='mr-3 mt-1 duration-150' /> : <IoChevronDown onClick={() => handleAddress()} size={25} className='mr-3 mt-1 duration-150' />
                    }
                </div>
            </div>
            <div className={showAddress ? 'h-auto bg-stone-100 rounded-md p-3 duration-150' : 'h-0 scale-0 invisible duration-150'}>
                <InputComp value={address ? addressField[0] : ""} type={"text"} placeholder={"Lot/Number"}/>
                <InputComp value={address ? addressField[1] : ""} type={"text"} placeholder={"Street"} style={"mt-3"}/>
                <InputComp value={address ? addressField[2] : ""}  type={"text"} placeholder={"Barangay"} style={"mt-3"}/>
                <div className='flex w-full overflow-hidden'>
                    <InputComp value={address ? addressField[3] : ""} type={"text"} placeholder={"City"} style={"w-1/2 mt-3"} />
                    <InputComp value={address ? addressField[4] : ""} type={"text"} placeholder={"Zip Code"} style={"w-1/2 ml-3 mt-3"} />
                </div>
                <InputComp value={address ? addressField[5] : ""} type={"text"} placeholder={"Province"} style={"mt-3"}/>
                <button className='bg-green-500 text-stone-100 font-medium rounded-md px-3 py-1 mt-3 w-full'>Set Shipping Address</button>
            </div>
            <button className='border-orange-700 border-2 bg-orange-500 text-stone-100 font-medium rounded-lg px-3 py-1' onClick={logOut}>logout</button>
        </div>
    )
}

export default Profile;