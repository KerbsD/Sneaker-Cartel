import Collection from "../components/Collection";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ItemView from '../components/ItemView';

function Shop() {
    const axiosPrivate = useAxiosPrivate();
    const [shoes, setShoes] = useState();

    const Brands = (props) => {
        return < div class="w-25 h-25 bg-white snap-center grid place-content-center rounded" >
            <p className="text-2xl font-bold text-center">{props.label}</p>
        </div >
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAllShoes = async () => {
            try {
                const response = await axiosPrivate.get(`/shoes`,
                    {
                        signal: controller.signal
                    });
                console.log(response.data);
                isMounted && setShoes(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getAllShoes();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])



    return (
        <div className="mx-4">
            <h2 className='text-3xl my-5 text-zinc-100 uppercase font-bold tracking-tight'>Shop</h2>
            <div className="overflow-x-scroll">
                <div class="relative inline-block">
                    <div class="flex space-x-4 snap-x snap-mandatory overflow-x-auto no-scrollbar">
                        <Brands label={"All"} />
                        <Brands label={"Nike"} />
                        <Brands label={"Adidas"} />
                        <Brands label={"New Balance"} />
                        <Brands label={"Nike"} />
                        <Brands label={"Nike"} />
                        <Brands label={"Nike"} />
                        <Brands label={"Nike"} />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 place-items-strech md:mx-0 mt-5'>
                {
                    shoes?.map((shoe) => (
                        <ItemView key={shoe._id} event={() => handleAddToCart(shoe._id, shoe.brand, shoe.color, shoe.price)} Ipath={"/items/samba.png"} Ibrand={shoe.brand} Iname={shoe.model} Iprice={shoe.price} />
                    )
                    )
                }
            </div>
        </div>
    )
}

export default Shop;