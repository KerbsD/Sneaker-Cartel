import { motion } from "motion/react"
import { Link } from 'react-router-dom'
import { useEffect } from 'react';

const Success = () => {
    useEffect(() => {window.scrollTo(0, 0);}, [])

    return (
        <div className='w-[100vw] h-[85vh] z-60 md:left-0'>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center rounded-xl h-full">
                <img src="/items/trolley.gif" alt="Success" className="w-[300px] h-[300px] object-cover" />
                <h1 className="text-3xl font-bold text-stone-100 tracking-tight">Ordered Successfully!</h1>
                <Link to={'/shop'}>
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="mx-auto px-3 py-1 my-14 text-center text-base font-semibold text-stone-200 border-2 border-green-700 bg-green-500 rounded-lg w-[200px]"
                    >
                        Continue Shopping
                    </motion.div>
                </Link>
            </motion.div>

        </div>
    )
}

export default Success;