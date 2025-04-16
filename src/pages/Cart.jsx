import CartItem from "../components/CartItems";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from "../hooks/useAuth";
import { debounce } from "lodash";
import { motion } from "motion/react"
import { CircleMinus } from 'lucide-react'

function Cart() {
    const axiosPrivate = useAxiosPrivate();
    const controller = new AbortController();
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState();
    const { auth } = useAuth();
    const [notif, setNotif] = useState();
    const [render, setRender] = useState(true)

    const handleRender = () => {    
        setRender(prevState => !prevState)
    }

    useEffect(() => {
        setIsLoading(true);
        let isMounted = true;

        const getShoeDetails = async () => {
            try {
                const response = await axiosPrivate.get(`/carts`, {
                    params: {
                        id: auth.id
                    },
                    signal: controller.signal
                });
                console.log(response.data); 
                isMounted && setCart(response.data);
                setIsLoading(false);
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
    }, [render])

    const handleDeleteCartItem = debounce(async (id, size) => {
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
            handleRender()
            setTimeout(() => {
                setNotif("")
            }, 2000)
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
            <div className={notif ? 'bg-slate-300 rounded-md duration-200 fixed left-1/2 -translate-x-1/2 z-50 flex items-center' : "left-0 h-0 duration-100"}>
                <p className='font-medium px-2 py-0.5'>{notif}</p>
                <div className={notif ? 'bg-red-400 rounded-r-md' : "h-0 "}>
                    <CircleMinus size={35} strokeWidth={2} className={notif ? 'inline-block p-1 invert' : "hidden"} />
                </div>
            </div>

            <h1 className='text-3xl text-center text-zinc-100 my-5 tracking-wide uppercase font-bold'>Bag</h1>
            {
                !isLoading
                    ?
                    cart && cart.length > 0
                        ?
                        cart.map(item => {
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
                        })
                        :
                        <div className="my-40 text-center mx-5 text-2xl font-semibold text-stone-200">Your bag is currently empty!</div>
                    :
                    <div className="p-5 border border-t-0 border-b-zinc-100 border-x-0 mx-3 flex animate-pulse">
                        <div className="w-30 rounded-md h-20 bg-stone-100/40"></div>
                        <div className="pl-5 w-full flex flex-col gap-3">
                            <div className="bg-stone-100/40 rounded-md h-3.5 w-1/2"></div>
                            <div className="bg-stone-100/40 rounded-md w-full h-5"></div>
                            <div className="flex items-center gap-2">
                                <div className="bg-stone-100/40 rounded-md h-4 w-1/3"></div>
                                <div className="bg-stone-100/40 rounded-md h-4 w-1/3"></div>
                                <div className="bg-stone-100/40 rounded-md h-4 w-1/3"></div>
                            </div>
                        </div>
                    </div>

            }
            {
                !isLoading
                    ?
                    cart && cart.length > 0
                        ?
                        <div className="p-5 border border-t-zinc-100 border-b-0 border-x-0 mx-3 flex flex-col ">
                            <div className="flex justify-between">
                                <p className="text-xl text-zinc-100 font-bold">Subtotal:</p>
                                <p className="text-xl text-zinc-100 font-bold">
                                    Php {Intl.NumberFormat('en-US').format(cart?.reduce((acc, item) => acc + (item.exceeds_stock ? item.details.price * item.max_order : item.details.price * item.total_quantity), 0))}
                                </p>
                            </div>
                            <p className="text-xs text-zinc-100 font-light mt-2">Excluding Tax and Shipping</p>
                            <Link to={'/checkout'}>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="py-2 border border-green-700 rounded-lg bg-green-600 text-stone-100 font-medium text-xl mt-6 w-full">
                                    Checkout
                                </motion.button>
                            </Link>
                        </div>
                        :
                        <Link to={'/shop'}>
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className="mx-auto px-3 py-1 my-40 text-center text-base font-semibold text-stone-200 border-2 border-green-700 bg-green-500 rounded-lg w-[200px]"
                            >
                                Continue Shopping
                            </motion.div>
                        </Link>
                    :
                    <div className="p-5 border border-t-zinc-100 border-b-0 border-x-0 mx-3 flex flex-col animate-pulse">
                        <div className="flex justify-between">
                            <p className="h-5 bg-stone-100/40 w-2/6 rounded-md"></p>
                            <p className="h-5 bg-stone-100/40 w-2/12 rounded-md"></p>
                        </div>
                        <p className="h-3 bg-stone-100/40 w-1/6 mt-3 rounded-md"></p>
                    </div>
            }
        </div >

    )
}

export default Cart;

