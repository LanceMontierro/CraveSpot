import { Logo } from "../assets";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
const Footer = () => {
  return (
    <footer className="max-w-[1440px] mx-auto py-6 px-[25px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="CraveSpot" className="w-[45px] h-[45px]" />
          <span className="text-primary text-textMd font-bold">
            © {new Date().getFullYear()} CraveSpot
          </span>
        </div>

        <div className="flex items-center gap-2">
          <InstagramIcon className="cursor-pointer" />
          <FacebookTwoToneIcon className="cursor-pointer " />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
