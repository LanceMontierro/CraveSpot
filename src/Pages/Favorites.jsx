import { useOrderContext } from "../Context/orderContext";
import { Header } from "../Components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
const Favorites = () => {
  const { favoriteDish, addToFavoriteDish, addToCart } = useOrderContext();
  return (
    <>
      <Header />
      <section className="mt-28 max-w-[1440px] mx-auto px-[25px]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 ">
          My Favourites
        </h1>
        <div
          className={` ${
            favoriteDish.length > 0
              ? "grid gap-6 sm:grid-cols-2 md:grid-cols-3 min-[1100px]:grid-cols-4"
              : ""
          }  `}
        >
          {favoriteDish.length === 0 ? (
            <div className="flexCenter flex-col w-full h-[50vh]">
              <p className="text-gray-800 font-bold mb-2 text-textLg">
                No favourites Saved
              </p>
              <p className="mb-2 text-center text-gray-600">
                You’ll see all your favorites here, to make ordering even
                faster. Just look for the
              </p>
              <IconButton>
                <FavoriteIcon
                  sx={{
                    color: "red",
                    fontSize: 16,
                    transition: "transform 0.2s ease, opacity 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.2)",
                      opacity: 0.8,
                    },
                  }}
                />
              </IconButton>

              <Link
                to={"/dashboard"}
                className="bg-primary px-4 py-3 text-white rounded-md text-textSm hover:opacity-90 duration-200 mt-4"
              >
                Let's find some Favourites
              </Link>
            </div>
          ) : (
            favoriteDish.map((dish) => (
              <div
                key={dish._id}
                className="shadow-md rounded-lg overflow-hidden border border-bgWhite group relative"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-48 w-full object-cover group-hover:scale-105 duration-300 ease-in-out"
                />
                <div className="p-4">
                  <h2 className="text-textMd font-semibold text-gray-800 line-clamp-1">
                    {dish.name}
                  </h2>
                  <p className="text-pink-600 font-bold text-textMd mt-2">
                    ₱{dish.price}
                  </p>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-1">
                    {dish.description}
                  </p>
                </div>
                <div className="p-4 border-t">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(dish);
                    }}
                    className="bg-primary px-4 py-3 text-white rounded-md text-textSm hover:opacity-90 duration-200 w-full"
                  >
                    Add To Cart
                  </button>
                </div>
                <button
                  className="absolute right-0 top-0 cursor-pointer rounded-sm bg-white p-1 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToFavoriteDish(dish);
                  }}
                >
                  <FavoriteIcon
                    sx={{
                      color: "red",
                      fontSize: 24,
                      transition: "transform 0.2s ease, opacity 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.2)",
                        opacity: 0.8,
                      },
                    }}
                  />
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Favorites;
