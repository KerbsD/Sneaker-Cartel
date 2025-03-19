import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import { faPhone, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Profile() {
    const { auth } = useAuth();
    const logout = useLogout();

    const logOut = async () => {
        await logout();
        navigate('/');
    };

    const Banner = (props) => {
        return (
            <div className="p-2 border border-zinc-100 rounded-md gap-2 bg-zinc-50 flex items-center shadow-amber-700 drop-shadow-lg">
                <div className="w-10 h-10 grid place-items-center bg-orange-400 rounded-full mx-2">
                    <FontAwesomeIcon size="lg" icon={props.icon} inverse />
                </div>
                <div>
                    <p className="text-base font-light text-green-600">{props.label}</p>
                    <p className="text-lg font-semibold"><span className="">{props.content}</span></p>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-20 mx-4 h-screen gap-3 flex flex-col">
            <h1 className='text-3xl text-center text-zinc-100 my-5 tracking-wide uppercase font-bold'>Profile</h1>
            <h1 className="text-center my-10 text-2xl font-light text-zinc-50">Hello, <span className="font-bold">{auth.fullname.split(" ")[0]}</span> </h1>
            <Banner icon={faUser} label={"Fullname:"} content={auth.fullname} />
            <Banner icon={faPhone} label={"Mobile Number:"} content={auth.number} />
            <Banner icon={faEnvelope} label={"Email:"} content={auth.mail} />
            <button onClick={logOut}>Dito yung logout</button>
        </div>
    )
}

export default Profile;