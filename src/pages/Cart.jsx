import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from "../hooks/useAuth";
import { debounce } from "lodash";

function Cart() {
    const [cart, setCart] = useState();
    const axiosPrivate = useAxiosPrivate();
    const controller = new AbortController();
    const { auth } = useAuth();
    const [notif, setNotif] = useState();

    const CartItem = (props) => {
        return (
            <div className="p-5 border border-t-0 border-b-zinc-100 border-x-0 mx-3 flex items-center">
                <img className="w-30 rounded-md" src={`https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/${props.folder}/${props.name}`} alt="" />
                <div className="pl-5">
                    <p className="text-zinc-100 text-sm">{props.brand}</p>
                    <p className="text-zinc-100 text-xl font-bold">{props.variant}</p>
                    <div className="flex items-center gap-2">
                        <p className="text-zinc-100 font-light">{props.price}</p>
                        <p className="text-zinc-100 font-light">{props.qty}</p>
                        <p className="text-zinc-100 font-light">{props.size}</p>
                    </div>
                </div>
                <div className="ml-auto">
                    <img onClick={props.onclick} src="/resources/close.svg" className="invert w-7" alt="" />
                </div>
            </div>
        )
    }

    useEffect(() => {
        let isMounted = true;

        const getShoeDetails = async () => {
            try {
                const response = await axiosPrivate.get(`/carts`, {
                    params: {
                        id: auth.id, // Replace with the actual user ID
                    },
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setCart(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getShoeDetails();

        return () => {
            isMounted = false;
            setTimeout(() => {
                controller.abort();
            }, 1000)
        }
    }, [notif]);

    const handleDeleteCartItem =debounce(async (id, size) => {
        try {
            const response = await axiosPrivate.delete('/carts',
                {
                    data: {
                        id: id,
                        size: size
                    }
                }
            );
            console.log(response.data.message)
            setNotif(response.data.message)
            setTimeout(() => {
                setNotif("")
            }, 1500)
        } catch (err) {
            if (!err?.response) {
                console.log(err);
            } else if (err.response?.status === 400) {
                console.log(err);
            } else {
                console.log(err)
            }
        }
    }, 300)

    return (
        <div className="">
            {
                <p className={notif ? "text-stone-100 px-4 py-1 border-2 border-red-700 bg-red-400 rounded-lg font-bold text-center w-[150px] left-35 duration-150 absolute" : ""}>{notif}</p>
            }
            <h1 className='text-3xl text-center text-zinc-100 my-5 tracking-wide uppercase font-bold'>Cart</h1>
            {
                cart && cart.length > 0 ? cart.map(item => {
                    return <CartItem
                        key={`${item._id?.product_id}-${item._id?.size}`}
                        folder={item.details.model}
                        name={item.details.image}
                        brand={item.details.brand}
                        variant={`${item.details.model} - ${item.details.color}`}
                        price={'Php ' + Intl.NumberFormat('en-US').format(item.exceeds_stock ? item.details.price * item.max_order : item.details.price * item.total_quantity)}
                        qty={`Qty: ${item.exceeds_stock ? item.max_order : item.total_quantity}`}
                        size={"Size: " + item._id?.size}
                        onclick={() => handleDeleteCartItem(item._id?.product_id, item._id?.size)}
                    />
                }) : <div className="my-40 text-center mx-5 text-2xl font-semibold text-stone-200">Your bag is currently empty!</div>
            }
            {
                cart && cart.length > 0 ? <div className="p-5 border border-t-zinc-100 border-b-0 border-x-0 mx-3 flex flex-col ">
                    <div className="flex justify-between">
                        <p className="text-xl text-zinc-100 font-bold">Subtotal:</p>
                        <p className="text-xl text-zinc-100 font-bold">
                            Php {Intl.NumberFormat('en-US').format(cart?.reduce((acc, item) => acc + (item.exceeds_stock ? item.details.price * item.max_order : item.details.price * item.total_quantity), 0))}
                        </p>
                    </div>
                    <p className="text-xs text-zinc-100 font-light mt-2">Excluding Tax and Shipping</p>
                </div> :
                    <Link to={'/shop'}>
                        <div className="mx-auto px-3 py-1 my-40 text-center text-base font-semibold text-stone-200 border-2 border-green-700 bg-green-500 rounded-lg w-[200px]">Continue Shopping</div>
                    </Link>
            }
        </div>

    )
}

export default Cart;
