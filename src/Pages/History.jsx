import { useOrderContext } from "../Context/orderContext";
import { Header } from "../Components";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const History = () => {
  const { orderData, addToCart } = useOrderContext();
  const flattenedOrderData = orderData.flat();

  return (
    <>
      <Header />
      <section className="px-[25px] max-w-[1440px] py-4 mt-20 mx-auto  h-[80vh]">
        <div className="bg-white p-6 rounded-lg shadow-md max-h-max">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {" "}
            Order History
          </h2>
          {flattenedOrderData.length === 0 ? (
            <div className="flexCenter flex-col w-full h-[50vh]">
              <p className="text-gray-800 font-bold mb-2 text-textLg">
                No Order History found
              </p>
              <p className="mb-2 text-center text-gray-600">
                You haven't placed any orders yet. Let's find some foods
              </p>
              <Link
                to={"/dashboard"}
                className="bg-primary px-4 py-3 text-white rounded-md text-textSm hover:opacity-90 duration-200 mt-4"
              >
                Let's find some foods
              </Link>
            </div>
          ) : (
            flattenedOrderData.map((order, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 border-b max-[450px]:flex-col border-gray-200 flex-wrap gap-3 "
              >
                {order.cartItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-textMd font-semibold text-gray-800">
                        {item.name} ({item.quantity})
                      </h3>
                      <p className="text-textSm font-bold text-pink-600 mt-2">
                        ₱{item.price}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-4 justify-end max-[828px]:w-full ">
                  <ShoppingCartIcon
                    className="cursor-pointer"
                    onClick={() =>
                      order.cartItems.forEach((item) => addToCart(item))
                    }
                  />
                  <p className="font-semibold text-textSm text-gray-800">
                    {" "}
                    ₱{order.subtotal}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default History;
