import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
const Footer = () => {
  const year = new Date();
  return (
    <div className="bg-[#212121] text-white w-full shadow-sm py-4 px-6 md:px-20 lg:px-28 flex flex-row items-center justify-between">
      <p className="text-sm md:text-base">
        &copy; {year.getFullYear()} by Pradeep Arivazhagan.
      </p>
      <div className="flex flex-row items-center justify-center gap-4">
        <a
          href="https://pradeeparivazhaganportfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CgProfile className="w-5 h-5 md:w-6 md:h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/pradeeparivazhagan/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="w-5 h-5 md:w-6 md:h-6" />
        </a>
        <a
          href="https://github.com/PradeepArivazhagan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="w-5 h-5 md:w-6 md:h-6" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
