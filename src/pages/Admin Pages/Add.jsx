import { IoHandLeft } from 'react-icons/io5';
import Button from '../../components/Button';
import { useState } from 'react';

function ListShoe() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [color, setColor] = useState("");
    const [description, setDesc] = useState("");
    const [size, setSize] = useState(0);
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [sizes, setSizes] = useState([]);
    const [stocks, setStocks] = useState([]);

    const addItem = (size, stock) => {
        setSizes((prev) => [...prev, size]);
        setStocks((prev) => [...prev, stock]);
        setStock("")
        setSize("")
    };

    console.log(sizes);
    console.log(stocks);

    const handleShoeData = () => {
        const shoeDetails = {
            "brand": brand,
            "model": model,
            "color": color,
            "size": sizes,
            "price": price,
            "description": description,
            "stocks":
                [
                    sizes.map((size, index) => (
                        {
                            "size": size, // Assign individual size
                            "stock": stocks[index], // Ensure stock is an array with a corresponding value for each size
                        }
                    ))
                ],
        }

        console.log(shoeDetails);
    }


    return (
        <div className="">
            <h1 className="text-2xl text-stone-100 font-medium tracking-tight">List a Shoe:</h1>
            <div className="flex w-screen gap-2">
                <div className="flex flex-col">
                    <label className="py-2 text-stone-100 font-light">Brand:</label>
                    <input className="bg-stone-100 p-1 rounded-sm mr-1 w-full" onChange={e => setBrand(e.target.value)} value={brand} type="text" />
                </div>
                <div className="flex flex-col">
                    <label className="py-2 text-stone-100 font-light">Model:</label>
                    <input className="bg-stone-100 p-1 rounded-sm w-full" value={model} onChange={e => setModel(e.target.value)} type="text" />
                </div>
            </div>
            <div className="flex w-screen gap-2">
                <div className="flex flex-col">
                    <label className="py-2 text-stone-100 font-light">Color:</label>
                    <input className="bg-stone-100 p-1 rounded-sm mr-1 w-full" onChange={e => setColor(e.target.value)} value={color} type="text" />
                </div>
            </div>
            <div className="flex w-screen gap-2">
                <div className="flex flex-col">
                    <label className="py-2 text-stone-100 font-light">Price:</label>
                    <input className="bg-stone-100 p-1 rounded-sm  w-51" type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-col">
                    <label className="py-2 text-stone-100 font-light">Description: </label>
                    <textarea className="bg-stone-100 p-1 rounded-sm w-screen" type="text" value={description} onChange={e => setDesc(e.target.value)}></textarea>
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-col w-[50vw]">
                    <div className='flex'>
                        <div>
                            <label className="py-2 text-stone-100 font-light">Sizes:</label>
                            <input className="bg-stone-100 p-1 rounded-sm w-full" value={size} onChange={e => setSize(e.target.value)} type="text" />
                        </div>
                        <div>
                            <label className="py-2 text-stone-100 font-light">Stock:</label>
                            <input className="bg-stone-100 p-1 rounded-sm w-full" value={stock} onChange={e => setStock(e.target.value)} type="text" />
                        </div>
                    </div>
                    <button className='py-1 rounded-md mt-1 bg-orange-400 text-stone-100' onClick={() => addItem(size, stock)}>Add</button>
                </div>
                <div className="flex flex-col mr-32">
                    <label className="py-2 text-stone-100 font-light">Stocks: </label>
                    {
                        sizes.map((size) => (
                            <div key={Math.random()} className="flex w-1/2 mt-2">
                                <input className="bg-stone-100 p-1 rounded-sm w-10" type="text" value={size} readOnly />
                                <p className="text-2xl mx-1 text-stone-100">:</p>
                                <input className="bg-stone-100 p-1 rounded-sm w-10" type="text" value={stocks[sizes.indexOf(size)]} readOnly />
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-col">
                    <label className=" text-stone-100 font-light py-2">Images: </label>
                    <input className="bg-stone-100 p-1 rounded-sm w-full" type="file" />
                    <p className="py-2 text-stone-100">Preview:</p>
                </div>
            </div>
            <Button label={"Add Shoe"} style={"bg-orange-400 text-zinc-50 px-2 mt-10"}></Button>
            <button onClick={handleShoeData}>Test</button>
        </div>
    )
}

export default ListShoe;