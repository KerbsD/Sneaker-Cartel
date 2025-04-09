import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
    return (
        <div className="bg-zinc-100 mt-auto p-10 w-screen fixed z-50 md:absolute md:left-0">
            {/* <img src="/resources/home-logo.png" className="h-20 mx-auto mb-10" alt="" /> */}
            <h1 className="text-3xl text-orange-500 font-bold text-center mb-6"><span className="text-green-500">Sneaker </span>Cartel <sup className="w-0.5">&copy;</sup></h1>
            <h2 className="text-xl font-bold tracking-tight mb-5">Contact Us</h2>
            <div className="flex flex-col gap-5 justify-center">
                <div className="flex text-sm items-center gap-5">
                    <FontAwesomeIcon size="lg" icon={faLocationDot} />
                    <p>Brgy Dalig, Antipolo City, Philippines</p>
                </div>
                <div className="flex text-sm items-center gap-5">
                    <FontAwesomeIcon size="lg" icon={faPhone} />
                    <p>0962 619 2783</p>
                </div>
                <div className="flex text-sm items-center gap-5">
                    <FontAwesomeIcon size="lg" icon={faEnvelope} />
                    <p>Kennethbilbao839@gmail.com</p>
                </div>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-right mb-5 mt-5">Socials</h2>
            <div className="flex gap-5 justify-end ">
                <img src="/resources/fb.svg" className="w-6" alt="" />
                <img src="/resources/x.svg" className="w-6" alt="" />
                <img src="/resources/instagram.svg" className="w-6" alt="" />
            </div>
            <div className="mt-5">
                <p className="text-center">YOUR SNEAKER OBSESSION BEGINS HERE ⚡️
                🌏SHIPPING WORLD WIDE</p>
            </div>
        </div>
    )
}

export default Footer;