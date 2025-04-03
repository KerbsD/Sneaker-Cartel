import useAuth from '../hooks/useAuth';
import Carousel from '../components/Carousel';
import ItemView from '../components/ItemView';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { motion } from "motion/react"
import { Link } from "react-router-dom"

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
                isMounted && setShoeList(response.data);
            } catch (err) {
                console.error(err);
                if (err.code !== "ERR_CANCELED")
                    navigate("/login", { state: { from: location }, replace: true });
            }
        }

        getAllShoes();

        return () => {
            isMounted = false;
            setTimeout(() => {
                controller.abort();
            }, 1000)
        }
    }, [])

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
                            <motion.div
                                key={shoe._id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ amount: 0.5 }}
                            >
                                <Link to={`/${shoe._id}`} key={shoe._id}>
                                    <ItemView key={shoe._id} event={() => handleAddToCart(shoe._id, shoe.brand, shoe.color, shoe.price)} Icolor={shoe.color} folder={shoe.model} name={shoe.images[0]} Ibrand={shoe.brand} Iname={shoe.model} Iprice={shoe.price} />
                                </Link>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Home;