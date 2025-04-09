import { useState, useEffect, use } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ItemView from '../components/ItemView';
import { motion } from "motion/react"
import { Link } from 'react-router-dom';

function Shop() {
    const axiosPrivate = useAxiosPrivate();
    const [shoes, setShoes] = useState();
    const [sort, setSort] = useState(true);
    const [brand, setBrand] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    const Brands = (props) => {
        return (
            <div onClick={props.onclick} className="w-25 h-25 bg-white snap-center grid place-content-center rounded">
                <p className="text-2xl font-bold text-center">{props.label}</p>
            </div >
        )
    }

    useEffect(() => {
        setIsLoading(false);
        let isMounted = true;
        const controller = new AbortController();

        const getAllShoes = async () => {
            try {
                const response = await axiosPrivate.get(`/shoes`,
                    {
                        signal: controller.signal
                    });
                console.log(response.data);
                setIsLoading(true);
                isMounted && setShoes(response.data);
            } catch (err) {
                console.error(err);
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
        <div className="mx-4">
            <h2 className='text-3xl my-5 text-zinc-100 uppercase font-bold tracking-tight'>Shop</h2>
            <div className="overflow-x-scroll">
                <div className="relative inline-block">
                    <div className="flex space-x-4 snap-x snap-mandatory overflow-x-auto no-scrollbar">
                        <Brands onclick={() => setSort(true)} label={"All"} />
                        {
                            shoes?.filter((shoe, index, self) =>
                                index === self.findIndex((s) => s.brand === shoe.brand)
                            ).map(shoe => {
                                return (
                                    <Brands onclick={() => {
                                        setSort(false);
                                        setBrand(shoe.brand)
                                    }} key={shoe._id} label={shoe.brand} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 place-items-strech md:mx-0 mt-5'>
                {
                    shoes?.filter(shoe => sort ? shoe.available === true : shoe.brand === brand).map((shoe) => (
                        <Link to={`/${shoe._id}`} key={shoe._id}>
                            <ItemView loading={isLoading} key={shoe._id} event={() => handleAddToCart(shoe._id, shoe.brand, shoe.color, shoe.price)} Icolor={shoe.color} folder={shoe.model} name={shoe.images[0]} Ibrand={shoe.brand} Iname={shoe.model} Iprice={shoe.price} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Shop;