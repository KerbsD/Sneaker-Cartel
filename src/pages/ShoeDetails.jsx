import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';
import { IoBagAdd } from "react-icons/io5";
import { motion } from "motion/react"
import useAuth from "../hooks/useAuth";
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { debounce } from "lodash";


function ShoeDetails() {
    const { shoeId } = useParams();
    const controller = new AbortController();
    const [shoeDetails, setShoeDetails] = useState({});
    const [selectedSize, setSelectedSize] = useState();
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [medias, setMedias] = useState();
    const [main, setMain] = useState();
    const [quantity, setQuantity] = useState(1)
    const { auth } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
        let isMounted = true;

        const getShoeDetails = async () => {
            try {
                const response = await axiosPrivate.get(`/shoes/${shoeId}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                setMain(response.data.images[0])
                const sizes = response.data.size;
                setSelectedSize(Math.min(...sizes))
                setLoading(false)
                setMedias(response.data.images)
                isMounted && setShoeDetails(response.data);
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
    }, []);

    useEffect(() => {

    }, []);

    const stocks = shoeDetails.stocks;

    const result = stocks && stocks.find(stock => stock.size == selectedSize);

    const stock = [];
    for (let i = 1; i <= result?.stock; i++) {
        stock.push(i);
    }

    const handleAddToCart = debounce(async (id, size, quantity) => {
        const itemDetails = {
            user_id: auth.id,
            items: [
                {
                    product_id: id,
                    size: size,
                    quantity: quantity,
                }
            ]
        }

        try {
            const response = await axiosPrivate.post('/carts', itemDetails);
            console.log("Shoe upload successful", response);
        } catch (err) {
            if (!err?.response) {
                console.log(err);
            } else if (err.response?.status === 400) {
                console.log('Invalid type provided.');
            } else {
                console.log(err)
            }
        }
    }, 500)

    return (
        <div className='mx-4'>
            <Link to={'/shop'}>
                <div className='flex items-center gap-3 w-15'>
                    <MdOutlineKeyboardBackspace className="invert my-3" size={30} />
                </div>
            </Link>
            <div className='h-60 my-3'>
                <img className='max-w-full max-h-full object-contain mx-auto rounded-md duration-300' src={`https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/${shoeDetails.model}/${main}`} alt="" />
            </div>
            <div className="overflow-x-scroll my-3">
                <div className='relative w-[800px]'>
                    <div className="flex space-x-4 snap-x snap-mandatory overflow-x-auto no-scrollbar">
                        {
                            medias && medias.map((media) =>
                                <div onClick={() => setMain(media)} key={media}>
                                    <img className='h-20' src={`https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/${shoeDetails.model}/${media}`} alt='no Image' />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                loading ?
                    <Loading />
                    :
                    <div>
                        <div className="flex flex-col items-center gap-3">
                            <h2 className='text-xl text-zinc-100 font-semibold'>{shoeDetails.brand}</h2>
                            <p className='text-4xl text-stone-100 font-bold uppercase'>"{shoeDetails.color}"</p>
                            <h3 className='text-xl font-light text-stone-100'>{shoeDetails.model}</h3>
                            <p className='text-lg font-medium text-stone-100'>Php {new Intl.NumberFormat('en-US').format(shoeDetails.price)}</p>
                        </div>
                        <hr className='w-1/2 mx-auto bg-stone-100 h-1 my-3' />
                        <div className='mb-3'>
                            <p className='text-stone-100 text-base'>Select Size:</p>
                            {
                                shoeDetails.size && shoeDetails?.size
                                    .sort((a, b) => a - b)
                                    .map((size, index) => (
                                        <span
                                            onClick={() => setSelectedSize(size)}
                                            key={index}
                                            className={selectedSize === size ? "text-stone-100 font-bold text-lg bg-green-600 px-2 rounded-sm mr-1 mt-3 duration-150" : "text-stone-900 font-bold text-lg bg-stone-200 px-2 rounded-sm mr-1 mt-3 duration-150"}
                                        >
                                            {size}
                                        </span>
                                    ))
                            }
                        </div>
                        <div>
                            <p className='text-stone-100 text-base'>Quantity:</p>
                            {
                                <select className='bg-stone-100 px-1 w-10 font-bold outline-none'
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}>
                                    {
                                        stock.map((number) => (
                                            <option className='font-bold' key={number} value={number}>
                                                {number}
                                            </option>
                                        ))
                                    }
                                </select>
                            }
                        </div>
                        <motion.button
                            onClick={() => handleAddToCart(shoeDetails._id, selectedSize, quantity)}
                            whileTap={{ scale: 0.9 }}
                            className='mx-auto border rounded-md px-4 my-14 text-2xl bg-green-600 text-stone-100 border-green-800 font-bold py-2 active:bg-green-800 active:text-stone-300 duration-300 flex items-center'
                        >
                            <IoBagAdd className='mr-4' size={30} />Add to Bag
                        </motion.button>
                    </div>
            }
        </div >
    );
}

export default ShoeDetails;