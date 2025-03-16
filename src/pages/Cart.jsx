import Button from "../components/Button";
import { Link } from "react-router-dom";

function Cart() {
    const CartItem = (props) => {
        return (
            <div className="p-5 border border-t-0 border-b-zinc-100 border-x-0 mx-3 flex items-center">
                <img src={props.img} className="w-25 rounded-lg" alt="" />
                <div className="pl-5">
                    <p className="text-zinc-100 text-sm">{props.brand}</p>
                    <p className="text-zinc-100 text-xl font-bold">{props.variant}</p>
                    <p className="text-zinc-100 font-light">{props.price}</p>
                </div>
                <div className="ml-auto">
                    <img src="/resources/close.svg" className="invert w-7" alt="" />
                </div>
            </div>
        )
    }

    return (
        <div className="">
            <h1 className='text-3xl text-center text-zinc-100 my-5 tracking-wide uppercase font-bold'>Cart</h1>
            {/* <div className="flex justify-center items-center flex-col">
                <img src="/resources/empty.svg" className="w-30 m-10 invert animate-bounce" alt="" />
                <h2 className="text-xl text-zinc-100 uppercase tracking-tight ">Your bag is currently empty.</h2>
                <Link to={'/shop'}>
                    <Button label={'Continue Shopping'} style={"bg-orange-400 text-zinc-50 px-3 mt-5 active:bg-orange-600 duration-300"} />
                </Link>
            </div> */}
            <CartItem img={"/items/550.png"} brand={"New Balance"} variant={"550 - Green"} price={"P15,000"} />
            <CartItem img={"/items/samba.png"} brand={"Adidas"} variant={"Samba - Beige"} price={"P7,000"} />
            <CartItem img={"/items/panda.png"} brand={"Nike"} variant={"SB Dunks - Panda"} price={"P20,000"} />
            <div className="p-5 border border-t-zinc-100 border-b-0 border-x-0 mx-3 flex flex-col ">
                <div className="flex justify-between">
                    <p className="text-xl text-zinc-100 font-bold">Subtotal:</p>
                    <p className="text-xl text-zinc-100 font-bold">P 42,000</p>
                </div>
                <p className="text-xs text-zinc-100 font-light mt-2">Excluding Tax and Shipping</p>
            </div>
        </div>
    )
}

export default Cart;