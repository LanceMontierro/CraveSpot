import { useState, useEffect, useMemo } from "react";
import { useOrderContext } from "../Context/orderContext";
import Pagination from "@mui/material/Pagination";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Foods = () => {
  const {
    dishes,
    setFilterDishes,
    filterDishes,
    setSelectedDish,
    selectedDish,
    favoriteDish,
    addToCart,
    setIsModalOpen,
    isModalOpen,
    quantity,
    setQuantity,
    addToFavoriteDish,
    searchItem,
    setSearchItem,
    activeFilter,
  } = useOrderContext();

  const displayDishes = filterDishes.length > 0 ? filterDishes : [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    setCurrentPage(1);
  }, [filterDishes]);

  useEffect(() => {
    setFilterDishes(dishes);
  }, []);

  const totalPages = Math.ceil(displayDishes.length / itemsPerPage);

  const currentDishes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return displayDishes.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, displayDishes]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 20, behavior: "smooth" });
  };

  const showSelectedDish = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setQuantity(1);
  };

  const addQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const removeQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  return (
    <div className="mt-6 max-w-(--breakpoint-xl) mx-auto pr-[25px] max-[992px]:px-[25px]">
      <div className="flex items-center mb-6  bg-white border border-gray-300 rounded-xl p-3 shadow-xs w-full max-[992px]:hidden ">
        <SearchOutlinedIcon className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search Foods"
          className="w-full text-textMd outline-hidden"
          onChange={(e) => setSearchItem(e.target.value)}
          value={searchItem}
        />
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-4 flex max-[576px]:flex-col max-[576px]:gap-1 items-center gap-10">
        Browse Our Dishes
        {searchItem || activeFilter ? (
          <p className="text-gray-600 font-medium text-textMd">
            {displayDishes.length} items found
          </p>
        ) : (
          <p className="text-gray-600 font-medium text-textMd">
            {displayDishes.length} dishes available
          </p>
        )}
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 min-[1100px]:grid-cols-4 pb-4">
        {currentDishes.length === 0 ? (
          <p className="text-gray-500">No dishes available.</p>
        ) : (
          currentDishes.map((dish) => (
            <div
              key={dish._id}
              className="shadow-md rounded-lg overflow-hidden border border-bgWhite group relative"
              onClick={() => showSelectedDish(dish)}
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

              <div
                className="absolute right-0 top-0 cursor-pointer rounded-xs bg-white p-1 shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  addToFavoriteDish(dish);
                }}
              >
                {favoriteDish.some(
                  (favorite) => favorite.name === dish.name
                ) ? (
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
                ) : (
                  <FavoriteIcon
                    sx={{
                      color: "gray",
                      fontSize: 24,
                      transition: "transform 0.2s ease, opacity 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.2)",
                        opacity: 0.8,
                      },
                    }}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Control */}
      {displayDishes.length > itemsPerPage && (
        <div className="flex justify-center mt-10 max-[992px]:pb-5">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="secondary"
          />
        </div>
      )}

      <Modal open={isModalOpen} onClose={closeModal} className="p-[15px]">
        <Box
          className="bg-white rounded-lg shadow-md p-6 max-w-md max-h-screen overflow-y-auto"
          style={{
            outline: "none",
            position: "relative",
            top: "10%",
            margin: "0 auto",
          }}
        >
          {selectedDish && (
            <div>
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="w-full h-48 object-cover rounded-md mb-4 max-sm:h-32"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2 max-sm:text-lg">
                {selectedDish.name}
              </h2>
              <p className="text-pink-600 font-bold max-sm:text-textSm">
                ₱{selectedDish.price}
              </p>
              <p className="text-gray-600 mt-4 max-sm:text-textSm">
                {selectedDish.description}
              </p>

              <div className="flex items-center gap-2 mt-4 ">
                <button
                  className={`bg-bgWhite rounded-[50%] p-1  ${
                    quantity === 1
                      ? "bg-[#D3D3D3] cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={removeQuantity}
                  disabled={quantity === 1}
                >
                  <RemoveIcon />
                </button>
                <span>{quantity}</span>
                <button
                  className="bg-bgWhite rounded-[50%] p-1 cursor-pointer"
                  onClick={addQuantity}
                >
                  <AddIcon />
                </button>

                <button
                  onClick={() => addToCart(selectedDish)}
                  className="bg-primary px-4 py-2 text-white rounded-md text-sm hover:opacity-90 duration-200 w-full"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Foods;
