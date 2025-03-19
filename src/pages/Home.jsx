import useAuth from '../hooks/useAuth';
import Carousel from '../components/Carousel';
import ItemView from '../components/ItemView';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate'

function Home() {
    const { auth } = useAuth();
    const [shoeList, setShoeList] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAllShoes = async () => {
            try {
                const response = await axiosPrivate.get('/shoes', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setShoeList(response.data);
            } catch (err) {
                console.error(err);
                if (err.code !== "ERR_CANCELED")
                    navigate("/login", { state: { from: location }, replace: true });
            }
        }

        getAllShoes();

        console.log(shoeList)

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const handleAddToCart = (id, brand, color, price) => {
        const info = {
            user_id: auth.id,
            items: [
                {
                    product_id: id,
                    brand: brand,
                    size: 10,
                    color: color,
                    quantity: 1,
                    price: price
                }
            ]
        }

        console.log(info)
    }

    return (
        <>
            <div className="h-screen">
                <Carousel />
            </div>
            <div className=''>
                <h2 className='text-3xl text-center text-zinc-100 my-5 tracking-wide uppercase font-bold'>Products</h2>
                <div className='grid grid-cols-2 mx-4 gap-4 md:grid-cols-3 place-items-strech md:mx-0'>
                    {
                        shoeList?.map((shoe) => (
                            <ItemView key={shoe._id} event={() => handleAddToCart(shoe._id, shoe.brand, shoe.color, shoe.price)} Ipath={"/items/samba.png"} Ibrand={shoe.brand} Iname={shoe.model} Iprice={shoe.price} />
                        )
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Home;