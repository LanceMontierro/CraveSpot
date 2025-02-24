import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  Dashboard,
  Cart,
  Favorites,
  Checkout,
  Profile,
  PageNotFound,
  History,
} from "../Pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "/cartItems",
    element: <Cart />,
  },

  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/Checkout",
    element: <Checkout />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/Order-History",
    element: <History />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
