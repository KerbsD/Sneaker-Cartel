import { motion } from 'motion/react';

const CartItem = (props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 1,
                ease: [0, 0.71, 0.2, 1.01]
            }}
            className="p-5 border border-t-0 border-b-zinc-100 border-x-0 mx-3 flex items-center"
        >
            <img className="w-30 rounded-md" src={`https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/${props.folder}/${props.name}`} alt="" />
            <div className="pl-5">
                <p className="text-zinc-100 text-sm">{props.brand}</p>
                <p className="text-zinc-100 text-xl font-bold">{props.variant}</p>
                <div className="flex items-center gap-2">
                    <p className="text-zinc-100 font-light">{props.price}</p>
                    <p className="text-zinc-100 font-light">{props.qty}</p>
                    <p className="text-zinc-100 font-light">{props.size}</p>
                </div>
            </div>
            <motion.div
                whileTap={{ scale: 0.5 }}
                className="ml-auto"
            >
                <img onClick={props.onclick} src="/resources/close.svg" className="invert w-7" alt="" />
            </motion.div>
        </motion.div>
    )
}

export default CartItem;