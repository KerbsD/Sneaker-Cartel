import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from "../hooks/useAuth";
import DeliveryInput from "../components/DeliverInput";
import ShipRadBtn from "../components/ShipRadBtn";
import { debounce } from "lodash";
import { CircleMinus } from "lucide-react"

function Checkout() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [shipMethod, setShipMethod] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState();
  const [shipping, setShipping] = useState(100);
  const [errorMsg, setErrorMsg] = useState("")

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    let isMounted = true;

    const getShoeDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/carts`, {
          params: {
            id: auth.id
          },
          signal: controller.signal
        });
        console.log(response.data);
        isMounted && setCart(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    getShoeDetails();

    return () => {
      isMounted = false;
      setTimeout(() => {
        controller.abort();
      }, 2200)
    }
  }, [])

  useEffect(() => {
    setErrorMsg("")
    setIsLoading(false)
  }, [firstName, lastName, address, region, city, postalCode, phone])

  const handleToggleSummary = () => {
    setIsSummaryOpen(prev => !prev)
  }

  const createOrder = debounce(async () => {
    setIsLoading(true)

    const missingFields = [
      { value: firstName, message: "First name is missing" },
      { value: lastName, message: "Last name is missing" },
      { value: address, message: "Address is missing" },
      { value: region, message: "Region is missing" },
      { value: city, message: "City is missing" },
      { value: postalCode, message: "Postal Code is missing" },
      { value: phone, message: "Phone number is missing" },
      { value: shipMethod, message: "Select Shipping method" }
    ];

    const error = missingFields.find(field => !field.value);

    if (error) {
      return setErrorMsg(error.message)
    }

    const orderDetails = ({
      'ordered_by': {
        'name': `${firstName} ${lastName}`,
        'email': "boijablo555@gmail.com",
        'address': `${address}, ${city}, ${region}, ${postalCode}`,
        'number': `${phone}`
      },
      'items': cart?.map(item => {
        return {
          'product_id': item._id?.product_id,
          'name': `${item.details.brand} ${item.details.model} - ${item.details.color}`,
          'size': item._id.size,
          'quantity': parseInt(item.exceeds_stock ? item.max_order : item.total_quantity),
          'price': parseInt(item.exceeds_stock ? item.details.price * item.max_order : item.details.price * item.total_quantity)
        }
      }),
      'total_amount': parseInt(shipping + cart?.reduce((acc, item) => acc + (item.exceeds_stock ? item.details.price * item.max_order : item.details.price * item.total_quantity), 0)),
      'payment_method': shipMethod
    })

    try {
      const response = await axiosPrivate.post('/orders', orderDetails);
      console.log("Ordered Successfully", response);
      setFirstName("");
      setLastName("");
      setAddress("");
      setRegion("");
      setCity("");
      setPostalCode("");
      setPhone("")
      setShipMethod("")
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    } 
  }, 500)

  return (
    <section className="p-2">

      <div className={errorMsg ? 'bg-slate-300 rounded-md duration-200 fixed left-1/2 -translate-x-1/2 z-50 flex items-center' : "left-0 h-0 duration-100"}>
        <p className='font-medium px-2 py-0.5'>{errorMsg}</p>
        <div className={errorMsg ? 'bg-red-400 rounded-r-md' : "h-0 "}>
          <CircleMinus size={35} strokeWidth={2} className={errorMsg ? 'inline-block p-1 invert' : "hidden"} />
        </div>
      </div>

      <h1 className="font-bold text-xl text-stone-100">Checkout</h1>

      <hr className="border-2 border-stone-100 rounded-md my-2" />

      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <p className="text-stone-100">Order Summary</p>
          <ChevronDown onClick={() => handleToggleSummary()} color="#f5f5f4 " className="ml-1" />
        </div>

        {
          cart?.length > 0
            ?
            <p className="text-stone-100 ">Total: <b>Php {Intl.NumberFormat('en-US').format(shipping + cart?.reduce((acc, item) => acc + (item.exceeds_stock ? item.details.price * item.max_order : item.details.price * item.total_quantity), 0))}</b></p>
            :
            null
        }
      </div>

      <div className={isSummaryOpen ? "bg-stone-100/10 rounded-md p-2 duration-150 h-auto flex flex-col gap-3" : "duration-150 h-0"}>
        {
          cart?.length > 0
            ?
            cart.map(item => {
              return <div key={`${item._id?.product_id}-${item._id?.size}`} className={isSummaryOpen ? "flex justify-around ease-in" : "hidden ease-out"}>
                <div className="relative">
                  <div className="bg-orange-500 rounded-full p-1 absolute -right-2 -top-2">
                    <p className="px-1.5 text-stone-100 text-xs">{item.exceeds_stock ? item.max_order : item.total_quantity}</p>
                  </div>
                  <img src={`https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/${item.details.model}/${item.details.image}`} alt="Shoe Image" className="h-[70px] w-[130px] border-green-600 border-2 rounded-md" />
                </div>
                <div className="px-3 flex flex-col w-full">
                  <p className="font-medium text-stone-100">{item.details.brand}</p>
                  <p className="text-sm text-stone-100">{`${item.details.model} / ${item.details.color}`}</p>
                  <p className="text-sm text-stone-100">Size: {item._id?.size}</p>
                </div>
                <div>
                  <p className="text-stone-100 text-sm">Php {Intl.NumberFormat('en-US').format(item.exceeds_stock ? item.details.price * item.max_order : item.details.price * item.total_quantity)}</p>
                </div>
              </div>
            })
            :
            null
        }
        <div className={isSummaryOpen ? "flex justify-between ease-in" : "hidden ease-out"}>
          <p className="text-stone-100 text-sm">Subtotal: </p>
          {
            cart?.length > 0
              ?
              <p className="text-stone-100 text-sm font-semibold">Php {Intl.NumberFormat('en-US').format(cart?.reduce((acc, item) => acc + (item.exceeds_stock ? item.details.price * item.max_order : item.details.price * item.total_quantity), 0))}</p>
              :
              null
          }
        </div>
        <div className={isSummaryOpen ? "flex justify-between ease-in" : "hidden ease-out"}>
          <p className="text-stone-100 text-sm">Subtotal: </p>
          <p className="text-stone-100 text-sm font-semibold" >Php {shipping}</p>
        </div>
      </div>

      <div>
        <p className="text-stone-100 mt-3 text-xl font-bold">Delivery</p>
        <div>
          <DeliveryInput type={"text"} onChange={e => setFirstName(e.target.value)} value={firstName} placeholder={"First Name"} />
          <DeliveryInput type={"text"} onChange={e => setLastName(e.target.value)} value={lastName} placeholder={"Last Name"} />
          <DeliveryInput type={"text"} onChange={e => setAddress(e.target.value)} value={address} placeholder={"Lot/Number, Street"} />
          <DeliveryInput type={"text"} onChange={e => setRegion(e.target.value)} value={region} placeholder={"Region"} />
          <DeliveryInput type={"text"} onChange={e => setCity(e.target.value)} value={city} placeholder={"City"} />
          <DeliveryInput type={"number"} onChange={e => setPostalCode(e.target.value)} value={postalCode} placeholder={"Postal Code"} />
          <DeliveryInput type={"number"} onChange={e => setPhone(e.target.value)} value={phone} placeholder={"Phone"} />
        </div>
      </div>

      <div>
        <p className="text-stone-100 mt-3 text-xl font-bold">Shipping Method</p>
        <div className="flex justify-between px-3 py-2 my-3 bg-stone-100/75 border rounded-md border-orange-500">
          <p className="text-green-900 font-bold">Standard</p>
          <p className="text-stone-900 ">P100.00</p>
        </div>
      </div>

      <div>
        <p className="text-stone-100 mt-3 text-xl font-bold">Payment</p>
        <div className="flex flex-col">
          <ShipRadBtn onClick={() => setShipMethod("Cash on Delivery")} method={shipMethod} label={"Cash on Delivery"} />
          <ShipRadBtn onClick={() => setShipMethod("Meet up")} method={shipMethod} label={"Meet up"} />
          <ShipRadBtn onClick={() => setShipMethod("GCash")} method={shipMethod} label={"GCash"} />
          <div className={shipMethod == "GCash" ? "inline-block px-3" : "hidden"}>
            <p className="text-xs text-stone-100">SEND DIRECTLY TO OUR GCASH ACCOUNT AFTER THIS TRANSACTION</p>
          </div>
        </div>
      </div>

      <Button onclick={() => createOrder()} loading={isLoading} disabled={isLoading} label={"Pay Now"} style={!isLoading ? "bg-orange-400 text-zinc-50 w-full mt-10" : "bg-orange-400/75 text-zinc-50 w-full mt-10"} />
    </section>
  );
}

export default Checkout;