import { filterOptions } from "../Const";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import { useOrderContext } from "../Context/orderContext";
const FilterFood = () => {
  const [mobileFilter, setMobileFilter] = useState(false);
  const {
    dishes,
    setFilterDishes,
    searchItem,
    setSearchItem,
    activeFilter,
    setActiveFilter,
  } = useOrderContext();

  const handleFilterChange = (item) => {
    const newFilter = activeFilter === item ? null : item;
    setActiveFilter(newFilter);

    const filteredDishes = newFilter
      ? dishes.filter((dish) => dish.types.includes(newFilter))
      : dishes;

    setFilterDishes(filteredDishes);
    setMobileFilter(false);
    setSearchItem("");
    document.body.style.overflow = "";
  };

  const resetFilterDishes = () => {
    setActiveFilter(null);
    setFilterDishes(dishes);
    setMobileFilter(false);
    document.body.style.overflow = "";
  };

  const toggleMobileFilter = () => {
    setMobileFilter((prev) => !prev);
    document.body.style.overflow = mobileFilter ? "" : "hidden";
  };

  return (
    <>
      <div className="overflow-hidden px-[25px] hidden min-[992px]:block">
        <div className="bg-bgWhite pt-[25px] px-[25px] pb-[30px] rounded-xl">
          <h2 className="font-bold">Filters</h2>
          {filterOptions.map((data, i) => (
            <fieldset
              className=" overflow-hidden border-b border-colorGray700"
              key={i}
            >
              <div className="py-[20px]">
                <span className="text-textMd text-primary font-semibold">
                  {data.title}
                </span>
              </div>
              {data.items.map((item, i) => (
                <ul className="overflow-hidden max-h-[288px]" key={i}>
                  <li className="pb-[10px] flex items-center">
                    <Checkbox
                      checked={activeFilter === item}
                      onChange={() => handleFilterChange(item)}
                    />
                    <button
                      className="text-textSm"
                      onClick={() => handleFilterChange(item)}
                    >
                      {item}
                    </button>
                  </li>
                </ul>
              ))}
            </fieldset>
          ))}
          <div className="border-t py-3 border-colorGray700"></div>
          <button
            className="bg-primary px-4 py-3 text-white rounded-md text-textSm hover:opacity-90 duration-200 w-full"
            onClick={resetFilterDishes}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Small screen filter */}
      <div className="max-[992px]:block hidden w-full px-[25px] relative ">
        <div className="flex items-center justify-between gap-4 ">
          <div className="flex items-center  bg-white border border-gray-300 rounded-xl p-3 shadow-xs w-[80%]">
            <SearchOutlinedIcon className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search Foods"
              className="w-full text-textMd outline-hidden"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>

          <button
            onClick={toggleMobileFilter}
            className="w-[20%] text-textSm border border-gray-300 rounded-xl p-3 flex items-center gap-3 justify-center "
          >
            <TuneIcon />
            <span className="max-[540px]:hidden block">Filters</span>
          </button>
        </div>
        {mobileFilter && (
          <div className="fixed inset-0 z-1000 bg-black bg-opacity-50 flexCenter">
            {/* Modal Container */}
            <div className="bg-white pt-6 px-6 pb-8 rounded-xl w-[90%] max-w-[624px] shadow-lg relative">
              <header className="flexBetween mb-6">
                <h2 className="font-bold text-xl">Filters</h2>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={toggleMobileFilter}
                >
                  ✕
                </button>
              </header>

              {/* Filter Content - Scrollable */}
              <div className="max-h-[400px] overflow-y-auto">
                {filterOptions.map((data, i) => (
                  <div key={i} className="mb-6">
                    <div className="mb-4">
                      <span className="text-textMd text-primary font-semibold">
                        {data.title}
                      </span>
                    </div>
                    <ul className="grid grid-cols-3 gap-4 max-[570px]:grid-cols-2">
                      {data.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <Checkbox
                            checked={activeFilter === item}
                            onChange={() => handleFilterChange(item)}
                          />
                          <button
                            className="text-sm text-gray-700 hover:text-primary transition"
                            onClick={() => handleFilterChange(item)}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button
                className="bg-primary px-4 py-3 text-white rounded-md text-textSm hover:opacity-90 duration-200 w-full mt-4"
                onClick={resetFilterDishes}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterFood;
