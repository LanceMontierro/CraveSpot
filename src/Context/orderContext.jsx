import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { notifySuccess, notifyError } from "../toastUtils/toast";
const orderContext = createContext();

export function useOrderContext() {
  return useContext(orderContext);
}

const ContextApi = ({ children }) => {
  const { isSignedIn, user } = useUser();
  const [cartItem, setCartItem] = useState([]);
  const [favoriteDish, setFavoriteDish] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [filterDishes, setFilterDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState();
  const [userAccount, setUserAccount] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const [activeFilter, setActiveFilter] = useState();
  const [location, setLocation] = useState("");
  const [paymentData, setPaymentData] = useState({
    gcashNumber: "",
    deliveryInstructions: "",
  });
  const [orderData, setOrderData] = useState([]);
  const [frequentOrder, setFrequentOrder] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (isSignedIn && user) {
      setUserAccount(user.fullName || "Guest");
    }
  }, [isSignedIn, user]);

  const subtotal = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const filteredDishes = dishes.filter((dish) => {
      const matchesFilter = activeFilter
        ? dish.types.includes(activeFilter)
        : true;
      const matchesSearch = searchItem
        ? dish.name.toLowerCase().includes(searchItem.toLowerCase())
        : true;

      return matchesFilter && matchesSearch;
    });

    setFilterDishes(filteredDishes);
  }, [searchItem, activeFilter]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const dishesResponse = await axios.get(`${API_URL}/dishes/get-dishes`);
        setDishes(dishesResponse.data.dishes || []);

        if (!userAccount) return;

        const userResponse = await axios.get(
          `${API_URL}/users/get-all-usersDetails?username=${userAccount}`
        );
        setUserDetails({
          fullN: userResponse.data.username,
          email: userResponse.data.email,
          ...userDetails,
        });
        setCartItem(userResponse.data.cartItems || []);
        setFavoriteDish(userResponse.data.favorites || []);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchUserData();
  }, [userAccount]);

  const fetchOrderResponse = async () => {
    try {
      const orderResponse = await axios.get(
        `${API_URL}/orders/get-order-details/${userAccount}`
      );
      setFrequentOrder(orderResponse.data.mostFrequentOrder || []);
      setOrderData(orderResponse.data.orderDetails || []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    if (userAccount) {
      fetchOrderResponse();
    }
  }, [userAccount]);

  // add to cart
  const addToCart = async (item) => {
    if (!userAccount) {
      notifyError("Please sign in to add items to cart");
      console.error("No user found. Cannot add to cart.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/users/add-to-cart`, {
        username: userAccount,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        types: item.types,
        quantity: quantity,
      });
      setCartItem((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (cartItem) => cartItem.name === item.name
        );

        if (existingItemIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += quantity;
          return updatedCart;
        }

        return [...prevCart, { ...item, quantity }];
      });
      notifySuccess(res.data.message);
      setQuantity(1);
      setIsModalOpen(false);
    } catch (error) {
      notifyError("Error adding item to cart:", error.message);
      console.error("Error adding item to cart:", error.message);
    }
  };

  // toggle fav dish
  const addToFavoriteDish = async (dish) => {
    if (!userAccount) {
      notifyError("Please sign in to add items to favorites");
      console.error("No user found. Cannot toggle favorite.");
      return;
    }

    try {
      //  directly comparing a single object (dish) against an array (favoriteDish).
      const isAlreadyFavorite = favoriteDish.some(
        (favorite) => favorite.name === dish.name
      );

      const res = await axios.post(`${API_URL}/users/toggle-favorite`, {
        username: userAccount,
        name: dish.name,
        description: dish.description,
        price: dish.price,
        image: dish.image,
        types: dish.types,
        quantity: 1,
      });
      notifySuccess(res.data.message);

      setFavoriteDish((prevDish) =>
        isAlreadyFavorite
          ? prevDish.filter((favdish) => favdish.name !== dish.name)
          : [...prevDish, dish]
      );
    } catch (error) {
      notifyError("Error toggling item in favorites:", error.message);
      console.error("Error toggling item in favorites:", error.message);
    }
  };

  const deleteItem = async (item) => {
    if (!userAccount) {
      notifyError("Please sign in to delete items in your cart");
      console.error("No user found. Cannot delete items.");
      return;
    }
    try {
      const res = await axios.delete(
        `${API_URL}/users/remove-from-cart/${item.name}`,
        {
          data: { username: userAccount },
        }
      );
      notifySuccess(res.data.message);

      setCartItem((prevCart) =>
        prevCart.filter((cartItem) => cartItem.name !== item.name)
      );
    } catch (error) {
      notifyError("Error removing item from cart", error.message);
      console.error("Error removing item from cart:", error.message);
    }
  };

  const updateItemQuantity = async (name, changeQuantity) => {
    if (!userAccount) {
      notifyError("Please sign in to update your cart");
      console.error("No user found. Cannot delete items.");
      return;
    }
    try {
      const res = await axios.patch(
        `${API_URL}/users/change-quantity/${name}`,
        {
          username: userAccount,
          change: changeQuantity,
        }
      );

      if (res.status === 200) {
        setCartItem((prevItems) =>
          prevItems.map((item) =>
            item.name === name
              ? { ...item, quantity: item.quantity + changeQuantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity of item:", error.message);
    }
  };

  const placeOrder = async (Order) => {
    if (!userAccount) {
      notifyError("Please sign in to place an order");
      console.error("No user found. Cannot place order.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/orders/submit-order-details`, {
        userOrder: Order,
      });

      notifySuccess(res.data.message);
      setCartItem([]);
      setPaymentData({});
      fetchOrderResponse();
    } catch (error) {
      notifyError("Error placing order:", error.message);
      console.error("Error placing order:", error.message);
    }
  };

  const getHumanReadableAddress = async (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_MAPS_API_KEY;

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted; // Get the formatted address

        setLocation(address);
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          address: address,
        }));
      } else {
        console.error("No address found for the given coordinates.");
      }
    } catch (error) {
      console.error("Error fetching address: ", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          getHumanReadableAddress(latitude, longitude);
        },
        (error) => {
          console.error("Error obtaining location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <orderContext.Provider
      value={{
        cartItem,
        setCartItem,
        isSignedIn,
        dishes,
        filterDishes,
        setFilterDishes,
        selectedDish,
        setSelectedDish,
        favoriteDish,
        setFavoriteDish,
        user,
        userAccount,
        setUserAccount,
        setIsModalOpen,
        isModalOpen,
        addToCart,
        setQuantity,
        quantity,
        addToFavoriteDish,
        deleteItem,
        updateItemQuantity,
        searchItem,
        setSearchItem,
        activeFilter,
        setActiveFilter,
        location,
        setPaymentData,
        paymentData,
        userDetails,
        setUserDetails,
        placeOrder,
        subtotal,
        orderData,
        frequentOrder,
      }}
    >
      {children}
    </orderContext.Provider>
  );
};

export default ContextApi;
