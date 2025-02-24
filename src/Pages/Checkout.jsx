import { useOrderContext } from "../Context/orderContext";
import { Header } from "../Components";

const Checkout = () => {
  const {
    location,
    cartItem,
    paymentData,
    userDetails,
    setUserDetails,
    placeOrder,
    subtotal,
  } = useOrderContext();

  const handlePhoneNumber = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const combinedDetails = {
      ...userDetails,
      ...paymentData,
      cartItems: cartItem,
    };

    placeOrder(combinedDetails);
  };

  return (
    <>
      <Header />
      <section className="mt-28 max-w-[1440px] mx-auto px-[25px] py-4 grid gap-8 sm:grid-cols-1 lg:grid-cols-2 ">
        <form>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <div
                className="mt-2 w-full p-3 border
              border-gray-300 rounded-md"
              >
                {userDetails.email}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Shipping
              </label>
              <div
                className="mt-2 w-full p-3 border
              border-gray-300 rounded-md"
              >
                {userDetails.fullN}
              </div>

              <div className="mb-4">
                <label className="text-[10px] font-semibold text-gray-700">
                  Phone
                </label>
                <input
                  className="mt-2 w-full p-3 border
              border-gray-300 rounded-md flex flex-col"
                  onChange={handlePhoneNumber}
                  name="phoneNumber"
                />
              </div>

              <div className="mb-4">
                <div
                  className="mt-2 w-full p-3 border
              border-gray-300 rounded-md flex flex-col"
                >
                  <label className="text-[10px] font-semibold text-gray-700">
                    Address
                  </label>
                  <span> {location}</span>
                </div>
              </div>
            </div>
            {paymentData.gcashNumber && (
              <div className="mb-4">
                <div
                  className="mt-2 w-full p-3 border
            border-gray-300 rounded-md flex flex-col"
                >
                  <label className="text-[10px] font-semibold text-gray-700">
                    Gcash No.
                  </label>
                  <span> {paymentData.gcashNumber}</span>
                </div>
              </div>
            )}
          </div>
        </form>

        <div className="bg-white p-6 rounded-lg shadow-md max-h-max">
          <h2 className="text-textLg font-bold text-gray-800 mb-6">
            Order Summary
          </h2>

          {cartItem.map((item) => (
            <div
              key={item._id}
              className="flex items-center py-4 border-b max-[450px]:flex-col border-gray-200 "
            >
              <div className="flex items-center justify-between w-full">
                <h3 className="text-textSm font-semibold text-gray-800">
                  {item.quantity > 1
                    ? `${item.name}  (${item.quantity})`
                    : item.name}
                </h3>

                <p className="text-textSm font-bold text-pink-600 ">
                  ₱{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <div className="flexBetween">
              <p className="text-textSm text-gray-500">Subtotal</p>
              <p className="text-textSm text-gray-500">₱ {subtotal}</p>
            </div>
            <div className="flexBetween">
              <p className="text-textSm text-gray-500">Standard Delivery</p>
              <p className="text-textSm text-gray-500">Free</p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={cartItem.length === 0}
            className={`${
              cartItem.length === 0
                ? "bg-bgWhite text-black opacity-65 cursor-not-allowed"
                : "bg-primary text-white "
            } px-4 py-3 w-full mt-6  rounded-md text-textSm hover:opacity-90 duration-200`}
          >
            Place Order
          </button>
        </div>
      </section>
    </>
  );
};

export default Checkout;
