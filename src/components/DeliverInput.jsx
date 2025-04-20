const DeliveryInput = ({ value, onChange, placeholder, type }) => {
    return (
      <input
        className="my-2 w-full text-stone-100 px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#abf07d] transition-all duration-150 ease-in-out caret-orange-500"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
    )
  }

  export default DeliveryInput;