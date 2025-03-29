import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';
import supabase from './helpers/SupabaseClient';

function ShoeDetails() {
    const { shoeId } = useParams();
    const controller = new AbortController();
    const [shoeDetails, setShoeDetails] = useState({});
    const [selectedSize, setSelectedSize] = useState();
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [media, setMedia] = useState();
    const [main, setMain] = useState();
    
    useEffect(() => {
        let isMounted = true;
        
        const getShoeDetails = async () => {
            try {
                const response = await axiosPrivate.get(`/shoes/${shoeId}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                setMain(response.data.images[0])
                setSelectedSize(response.data.size[0])
                setLoading(false)
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

    console.log(selectedSize)

    useEffect(() => {
        if (shoeDetails.model) {
            const getMedia = async () => {
                const { data, error } = await supabase.storage.from('sneaker-cartel').list('Gallery/' + `${shoeDetails.model}`, {
                    limit: 10,
                    offset: 0
                });

                if (data) {
                    setMedia(data);
                    console.log(data);
                } else {
                    console.log(71, error);
                }
            };

            getMedia();
        }
    }, [shoeDetails.model]);

    const stocks = shoeDetails.stocks;

    const result = stocks && stocks.find(stock => stock.size == selectedSize);

    const stock = [];
    for (let i = 1; i <= result?.stock; i++) {
        stock.push(i);
    }

    return (
        <div className='mx-4'>
            <div className='h-60 my-3'>
                <img className='max-w-full max-h-full object-contain mx-auto rounded-md' src={`https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/${shoeDetails.model}/${main}`} alt="" />
            </div>
            <div className="overflow-x-scroll my-3">
                <div className='relative w-[700px]'>
                    <div className="flex space-x-4 snap-x snap-mandatory overflow-x-auto no-scrollbar">
                        {
                            media && media.map((med) =>
                                <div onClick={() => setMain(med.name)} key={med.id}>
                                    <img className='h-20' src={`https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/${shoeDetails.model}/${med.name}`} alt='no Image' />
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
                                <select className='bg-stone-100 px-1 w-10 font-bold outline-none'>
                                    {stock.map((number) => (
                                        <option className='font-bold' key={number} value={number}>
                                            {number}
                                        </option>
                                    ))}
                                </select>
                            }
                        </div>
                    </div>
            }
        </div >
    );
}

export default ShoeDetails;