import Button from '../../components/Button';
import { useState } from 'react';
import FileUpload from './Test';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
    const [files, setFile] = useState([]);

    const axiosPrivate = useAxiosPrivate()

    let images = [];

    const addItem = (size, stock) => {
        if (size == 0 && stock == 0 || !size && !stock) {
            alert("Stock and Size should have a value.")
        } else {
            setSizes((prev) => [...prev, size]);
            setStocks((prev) => [...prev, stock]);
            setStock(0)
            setSize(0)
        }
    };

    for (let i = 0; i < files.length; i++) {
        images.push(files[i].name);
    }

    const handleFileChange = (e) => {
        setFile(e.target.files);
    }

    const handleShoeData = async () => {
        if (!brand || !model || !color || !price || !stocks || !sizes || !files) {
            alert("Missing details")
            return
        }

        if (price == 0 || !price) {
            alert("Price can't be zero")
            return
        }


        const shoeDetails = {
            "brand": brand,
            "model": model,
            "color": color,
            "size": sizes,
            "price": price,
            "description": description,
            "images": images,
            "stocks":
                sizes.map((size, index) => (
                    {
                        "size": parseInt(size), 
                        "stock": parseInt(stocks[index]), 
                    }
                ))
        }

        console.log(shoeDetails);

        try {
            const response = await axiosPrivate.post('/shoes', shoeDetails);
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
    }

    return (
        <div className="">
            <h1 className="text-2xl text-stone-100 font-medium tracking-tight">List a Shoe:</h1>
            <div className="flex w-screen gap-2">
                <div className="flex flex-col w-[50vw]">
                    <label className="py-2 text-stone-100 font-light">Brand:</label>
                    <input className="bg-stone-100 p-1 rounded-sm mr-1 w-full" onChange={e => setBrand(e.target.value)} value={brand} type="text" />
                </div>
                <div className="flex flex-col w-[50vw]">
                    <label className="py-2 text-stone-100 font-light">Model:</label>
                    <input className="bg-stone-100 p-1 rounded-sm w-full" value={model} onChange={e => setModel(e.target.value)} type="text" />
                </div>
            </div>
            <div className="flex w-screen gap-2">
                <div className="flex flex-col w-[50vw]">
                    <label className="py-2 text-stone-100 font-light">Color:</label>
                    <input className="bg-stone-100 p-1 rounded-sm w-full" onChange={e => setColor(e.target.value)} value={color} type="text" />
                </div>
                <div className="flex flex-col w-[50vw]">
                    <label className="py-2 text-stone-100 font-light">Price:</label>
                    <input className="bg-stone-100 p-1 rounded-sm w-full" type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-col">
                    <label className="py-2 text-stone-100 font-light">Description: </label>
                    <textarea className="bg-stone-100 p-1 rounded-sm w-screen" type="text" value={description} onChange={e => setDesc(e.target.value)}></textarea>
                </div>
            </div>
            <div className="flex gap-5">
                <div className="flex flex-col w-[30vw]">
                    <div className='flex'>
                        <div className='py-2 mr-2'>
                            <label className="text-stone-100 font-light">Sizes:</label>
                            <input className="my-2 bg-stone-100 p-1 rounded-sm w-full" value={size} onChange={e => setSize(e.target.value)} type="number" />
                        </div>
                        <div className='py-2'>
                            <label className="text-stone-100 font-light">Stock:</label>
                            <input className="my-2 bg-stone-100 p-1 rounded-sm w-full" value={stock} onChange={e => setStock(e.target.value)} type="number" />
                        </div>
                    </div>
                    <button className='py-1 rounded-md mt-1 bg-orange-400 text-stone-100' onClick={() => addItem(size, stock)}>Add</button>
                </div>
                <div className="flex flex-col w-[30vw]">
                    <label className="py-2 text-stone-100 font-light">Stocks: </label>
                    {
                        sizes.map((size) => (
                            <div key={Math.random()} className="flex w-1/2 mt-1">
                                <input className="bg-stone-100 p-1 rounded-sm w-10" type="text" value={size} readOnly />
                                <p className="text-2xl mx-1 text-stone-100">:</p>
                                <input className="bg-stone-100 p-1 rounded-sm w-10" type="text" value={stocks[sizes.indexOf(size)]} readOnly />
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-col w-[30vw]">
                    <input className="mt-2 relative block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white" type="file" multiple onChange={handleFileChange} />
                    <FileUpload folderName={model} images={files} />
                </div>
            </div>
            <Button onclick={handleShoeData} label={"Add Shoe"} style={"bg-orange-400 text-zinc-50 px-2 mt-10 mx-3 active:bg-orange-800"}></Button>
        </div>
    )
}

export default ListShoe;