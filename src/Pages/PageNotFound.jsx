import { Link } from "react-router-dom";
import Starfield from "react-starfield";

const PageNotFound = () => {
  return (
    <div className="flexCenter flex-col h-screen bg-black text-white font-rubik px-4 text-center overflow-hidden">
      <Starfield
        starCount={800}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />

      <h1 className="text-primary animate-pulse font-bold leading-none text-[100px] md:text-[150px] drop-shadow-md">
        404
      </h1>

      <p className="mt-4 text-textMd md:text-textLg  text-gray-300 ">
        Oops! The page you’re looking for has been ejected into space.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-primary text-white rounded-full text-lg animate-pulse font-medium drop-shadow-md "
      >
        Return to Safety
      </Link>

      <div className="absolute top-10 left-10 w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-16 h-16 bg-linear-to-br from-red-500 to-yellow-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
    </div>
  );
};

export default PageNotFound;
