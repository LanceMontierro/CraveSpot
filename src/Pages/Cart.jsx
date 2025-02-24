import { useOrderContext } from "../Context/orderContext";
import { Header } from "../Components";
import { Link, useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { filter } from "../Const";

const Cart = () => {
  const {
    cartItem,
    deleteItem,
    updateItemQuantity,
    setPaymentData,
    paymentData,
    subtotal,
  } = useOrderContext();

  const navigate = useNavigate();

  const [filteroption, setFilterOption] = useState("GCash");
  const [formError, setFormError] = useState(null);

  const handleFilterOption = (option) => {
    setFilterOption(option);
    setPaymentData({});
    setFormError(null);
  };

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (filteroption === "GCash") {
      if (!paymentData.gcashNumber) {
        setFormError("Please enter your GCash number.");
        return;
      }
      if (
        isNaN(paymentData.gcashNumber) ||
        paymentData.gcashNumber.length !== 11
      ) {
        setFormError(
          "GCash number must be exactly 11 digits and contain only numbers."
        );
        setTimeout(() => setFormError(null), 3000);
        return;
      }
    }

    // Proceed with checkout
    setPaymentData({ paymentMethod: filteroption, subtotal, ...paymentData });

    navigate("/Checkout");
  };

  const renderPaymentFields = () => {
    switch (filteroption) {
      case "GCash":
        return (
          <>
            <div className="mb-4">
              <label
                htmlFor="gcashNumber"
                className="block text-sm font-semibold text-gray-700"
              >
                GCash Number
              </label>
              <input
                type="text"
                id="gcashNumber"
                name="gcashNumber"
                value={paymentData.gcashNumber || ""}
                onChange={handlePaymentChange}
                placeholder="Enter your GCash number"
                className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            {formError && (
              <p className="text-red-500 text-sm my-2">{formError}</p>
            )}
            <div className="mb-4">
              <label
                htmlFor="deliveryInstructions"
                className="block text-sm font-semibold text-gray-700"
              >
                Delivery Instructions
              </label>
              <textarea
                id="deliveryInstructions"
                name="deliveryInstructions"
                value={paymentData.deliveryInstructions || ""}
                onChange={handlePaymentChange}
                placeholder="Add any specific delivery instructions"
                className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                rows="4"
              />
            </div>
          </>
        );
      case "Cash on Delivery":
        return (
          <div className="mb-4">
            <label
              htmlFor="deliveryInstructions"
              className="block text-sm font-semibold text-gray-700"
            >
              Delivery Instructions
            </label>
            <textarea
              id="deliveryInstructions"
              name="deliveryInstructions"
              value={paymentData.deliveryInstructions || ""}
              onChange={handlePaymentChange}
              placeholder="Add any specific delivery instructions"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <section
        className={`mt-28 max-w-[1440px] mx-auto px-[25px] grid gap-8  ${
          cartItem.length === 0
            ? "grid-cols-1"
            : "sm:grid-cols-1 lg:grid-cols-2"
        }`}
      >
        {/* Cart Items Section */}
        <div className="bg-white p-6 rounded-lg shadow-md max-h-max">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

          {cartItem.length === 0 ? (
            <div className="flexCenter flex-col w-full h-[50vh]">
              <p className="text-gray-800 font-bold mb-2 text-textLg">
                No Cart Items found
              </p>
              <p className="mb-2 text-center text-gray-600">
                You’ll see all your added cart items here.
              </p>
              <Link
                to={"/dashboard"}
                className="bg-primary px-4 py-3 text-white rounded-md text-textSm hover:opacity-90 duration-200 mt-4"
              >
                Let's find some foods
              </Link>
            </div>
          ) : (
            cartItem.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between py-4 border-b max-[450px]:flex-col border-gray-200 "
              >
                <div className="flex items-center  gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-textMd font-semibold text-gray-800">
                      {item.name}
                    </h3>

                    <p className="text-textSm font-bold text-pink-600 mt-2">
                      ₱{item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="bg-bgWhite rounded-full p-2 cursor-pointer">
                    {item.quantity <= 1 ? (
                      <DeleteIcon onClick={() => deleteItem(item)} />
                    ) : (
                      <RemoveIcon
                        onClick={() => updateItemQuantity(item.name, -1)}
                      />
                    )}
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-bgWhite rounded-full p-2 cursor-pointer"
                    onClick={() => updateItemQuantity(item.name, +1)}
                  >
                    <AddIcon />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Payment Method Section */}
        {cartItem.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md max-h-max">
            <h2 className="text-textLg font-bold text-gray-800 mb-6">
              Payment Information
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="payment-method"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Payment Method
                </label>
                <select
                  id="payment-method"
                  name="payment-method"
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                  required
                  onChange={(e) => handleFilterOption(e.target.value)}
                  value={filteroption}
                >
                  {filter.map((filter, i) => (
                    <option key={i} value={filter.title}>
                      {filter.title}
                    </option>
                  ))}
                </select>
              </div>
              {renderPaymentFields()}

              <div className="mb-4">
                <p className="font-semibold text-gray-800">
                  Subtotal: ₱{subtotal.toFixed(2)}
                </p>
              </div>

              <button
                type="submit"
                className="bg-primary px-4 py-3 w-full mt-4 text-white rounded-md text-textSm hover:opacity-90 duration-200"
              >
                Proceed to Checkout
              </button>
            </form>
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;
