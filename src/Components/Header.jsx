import { useAuth } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Logo } from "../assets";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import { useOrderContext } from "../Context/orderContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Header = () => {
  const { userAccount, cartItem, favoriteDish, location } = useOrderContext();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [userAcc, setUserAcc] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const toggleUserAcc = () => {
    setUserAcc(!userAcc);
  };

  const totalCartItems = cartItem.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <header className="w-full fixed top-0 left-0 right-0 z-100 px-[25px] bg-white shadow-md">
        <nav className="flexBetween py-4 max-w-[1440px] mx-auto w-full md:px-[10px] px-0 relative">
          <div className="md:hidden block">
            <IconButton aria-label="account" onClick={toggleUserAcc}>
              <AccountCircleIcon />
            </IconButton>
          </div>

          <Link to={"/dashboard"} className="flex items-center gap-3">
            <img src={Logo} alt="CraveSpot" className="w-[45px] h-[45px]" />
            <span className="text-primary text-textLg font-bold">
              CraveSpot
            </span>
          </Link>

          <div className=" items-center gap-1 hover:bg-gray-300 rounded-md py-2 px-3 duration-300 ease-in-out min-[992px]:flex hidden  ">
            <LocationOnIcon />
            <span className="text-textSm line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="p-2 hover:bg-gray-300 rounded-md gap-2  duration-300 ease-in-out md:flex hidden  "
              onClick={toggleUserAcc}
            >
              <AccountCircleIcon />
              <span>{userAccount}</span>
            </div>

            <div className="relative">
              <Link to={"/cartItems"}>
                <IconButton aria-label="shop">
                  <ShoppingBagOutlinedIcon />
                  {totalCartItems > 0 && (
                    <span className="absolute text-[12px] bg-red-500 text-white rounded-full h-[18px] w-[18px] flex items-center justify-center right-[-1px] top-[5px] font-bold">
                      {totalCartItems}
                    </span>
                  )}
                </IconButton>
              </Link>
              <Link to={"/favorites"}>
                <IconButton aria-label="shop">
                  <FavoriteBorderTwoToneIcon />
                  {favoriteDish.length > 0 && (
                    <span className="absolute text-[12px] bg-red-500 text-white rounded-full h-[18px] w-[18px] flex items-center justify-center right-[-1px] top-[5px] font-bold">
                      {favoriteDish.length}
                    </span>
                  )}
                </IconButton>
              </Link>
            </div>
          </div>
        </nav>
        {userAcc && (
          <div
            className={`bg-bgWhite z-1000  max-w-[250px] absolute rounded-md mt-2   ${
              userAcc ? "md:right-28 top-14" : "md:right-[100%]"
            } `}
          >
            <CloseIcon
              className="right-2 absolute top-2 cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={() => setUserAcc(false)}
            />

            <div className="flex flex-col items-center gap-6 py-6  px-[25px]">
              {/* CravePay */}
              <Link
                to={"/Profile"}
                className="flex items-center gap-4 w-full hover:bg-gray-300 rounded-md p-2 mt-3"
              >
                <AccountCircleIcon />
                <span>Profile</span>
              </Link>

              {/* Order History */}
              <Link
                to={"/Order-History"}
                className="flex items-center gap-4 w-full hover:bg-gray-300 rounded-md p-2"
              >
                <HistoryIcon />
                <span>Order History</span>
              </Link>

              <div className="border-t border-gray-400 w-full"></div>

              {/* Logout */}
              <button
                className="flex items-center gap-4 w-full hover:bg-gray-300 rounded-md  p-2"
                onClick={handleLogout}
              >
                <LogoutIcon />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
