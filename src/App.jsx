import { Logo, Hero, Banner, Cravings } from "./assets";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { WhyUs, howItWorks, faq } from "./Const";
import {
  SignIn,
  useClerk,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import Footer from "./Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifyInfo } from "./toastUtils/toast";

function App() {
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();
  const { user } = useClerk();

  const togglePopUp = () => {
    setPopUp(!popUp);
    document.body.style.overflow = popUp ? "" : "hidden";
  };

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const saveUserEmail = async () => {
      try {
        if (user) {
          const userEmail = user.emailAddresses[0].emailAddress;
          const name = user.fullName;

          const res = await axios.post(`${API_URL}/users/save-user-email`, {
            email: userEmail,
            username: name,
          });
          if (res.status === 200 && res.data.existingUser) {
            notifyInfo(`${res.data.message} ${res.data.existingUser.username}`);
          } else if (res.status === 201) {
            notifyInfo(`${res.data.message} ${res.data.newUser.username}`);
          }
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error saving email:", error);
      }
    };
    saveUserEmail();
  }, [user, navigate]);
  return (
    <>
      {/* Header Section */}
      <header className="w-full fixed top-0 left-0 right-0 z-[100] px-[25px] bg-white shadow-md">
        <nav className="flexBetween py-4 max-w-[1440px] mx-auto w-full md:px-[10px] px-0 relative">
          <div className="block md:hidden">
            <IconButton aria-label="User account menu" onClick={togglePopUp}>
              <AccountCircleIcon />
            </IconButton>
          </div>
          {popUp && (
            <div className="absolute z-[200] top-[60px] flexCenter h-screen w-full ">
              <SignIn />
            </div>
          )}
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={Logo} alt="CraveSpot" className="w-[45px] h-[45px]" />
            <span className="text-primary text-textLg font-bold">
              CraveSpot
            </span>
          </div>
          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <SignInButton>
              <button className="bg-transparent hover:scale-105 border border-[#39434d] px-3 rounded-md text-textSm hidden md:block">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-primary hover:scale-105 px-3 rounded-md text-white text-textSm hidden md:block">
                Sign up
              </button>
            </SignUpButton>
            <IconButton aria-label="shop">
              <ShoppingBagOutlinedIcon />
            </IconButton>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-bgWhite mt-20 w-full h-full py-4">
        <main className="max-w-[1440px] mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:h-full">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0">
            <h1 className="text-[36px] max-[420px]:text-[26px] md:text-[48px] font-bold mb-4 leading-tight">
              The perfect spot to satisfy your cravings.
            </h1>
            <p className="text-textMd mb-6">
              Hungry? We deliver your cravings to your doorstep.
            </p>
            <div className="flex items-center bg-white border border-gray-300 rounded-md p-2 shadow-sm">
              <SearchOutlinedIcon className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter your location..."
                className="w-[80%] text-textMd outline-none"
              />
              <SignInButton>
                <button className="bg-primary px-4 py-3 text-white rounded-md text-textSm hover:opacity-90 duration-200 hidden md:block">
                  Find Food
                </button>
              </SignInButton>
            </div>
            <SignInButton>
              <button className="bg-primary px-4 py-2 w-full mt-4 text-white rounded-md text-textSm hover:opacity-90 duration-200 block md:hidden">
                Find Food
              </button>
            </SignInButton>
          </div>
          {/* Right Content */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img src={Hero} alt="CraveSpot Hero" className="w-[80%] " />
          </div>
        </main>
      </section>

      <section className="py-16 max-[468px]:pb-4">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-8 max-[420px]:text-[26px]">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WhyUs.map((data, i) => (
              <div
                key={i}
                className="text-center gap-2 shadow-md rounded-md flex items-center"
              >
                <div className="w-1/2">
                  <img
                    src={data.img}
                    alt={data.title}
                    className="w-full h-full rounded-md"
                  />
                </div>
                <div className="w-1/2 p-2 ">
                  <h3 className="text-lg max-[460px]:text-textMd font-semibold mb-2">
                    {data.title}
                  </h3>
                  <p className="text-textSm">{data.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <div className="max-w-[1440px] mx-auto px-6 py-4 ">
        <img
          src={Banner}
          alt="CraveSpot banner with 20% off on first order featuring delicious food"
          className="w-full rounded-lg shadow-lg md:max-h-[500px] h-full"
        />
      </div>

      {/* How it works */}
      <section className="py-16 max-[468px]:pb-4">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-8 max-[420px]:text-[26px]">
            How It Works?
          </h2>
          <div className="space-y-4">
            {howItWorks.map((data, i) => (
              <div
                key={i}
                className="border border-gray-300 rounded-md p-4 shadow-sm transition hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {data.title}
                </h3>
                <p className="text-sm text-gray-600">{data.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative max-w-[1440px] mx-auto px-6 pt-4">
        <img
          src={Cravings}
          alt="CraveSpot banner foods"
          className="w-full rounded-lg md:max-h-[450px] h-full object-cover "
        />
        <div className="md:absolute px-4 py-4 left-16 transform mx-auto -translate-y-1/2 max-[420px]:-translate-y-1/4 bg-bgBox rounded-xl shadow-lg md:p-4 md:max-w-[600px] w-[90%]">
          <h2 className="md:text-xl text-textMd font-extrabold text-gray-800">
            Your Feast Awaits
          </h2>

          <p className="text-sm text-black mt-2">
            connect with food lovers, and ensure your dishes get delivered fresh
            and fast – all hassle-free!
          </p>

          <SignInButton>
            <button className="bg-primary text-white px-3 tracking-wider py-3 md:w-auto  mt-4 rounded-lg text-textSm hover:opacity-90 duration-200 w-[50%]">
              Get started
            </button>
          </SignInButton>
        </div>
      </div>

      <section className="w-full bg-bgWhite">
        <div className="py-12 md:py-44">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-center text-3xl font-bold mb-8 max-[420px]:text-[26px]">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faq.map((data, i) => (
                <div
                  key={i}
                  className="border border-gray-300 rounded-md p-4 shadow-sm transition hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {data.title}
                  </h3>
                  <p className="text-sm text-gray-600">{data.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
