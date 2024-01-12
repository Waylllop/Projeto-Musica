import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import MenuMobile from "./MenuMobile";
import MenuLinks from "./MenuLinks";
import useLanguage from "../../../Hooks/UseLanguage";

const Header = () => {
  const location = useLocation();
  const [isSongsOpen, setIsSongsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { language, setLanguage } = useLanguage();

  const handleLanguage = () => {
    if (language === "pt") {
      setLanguage("en");
      localStorage.setItem("language", "en");
    } else {
      setLanguage("pt");
      localStorage.setItem("language", "pt");
    }
  };

  useEffect(() => {
    if (location.pathname === "/work") {
      setIsSongsOpen(true);
    } else {
      setIsSongsOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="bg-dark flex justify-between px-0 py-4 fixed w-full z-20 lg:pr-32 lg:pl-16">
        <div className="flex md:gap-6 items-center">
          <motion.div
            className="box"
            whileTap={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <NavLink
              to="/home"
              className="font-coustard text-primary text-3xl px-6 md:px-0 lg:hover:text-[#fcc46a] lg:text-4xl lg:duration-200"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              LL
            </NavLink>
          </motion.div>
          <button className="text-dark bg-light w-10 rounded-lg" onClick={handleLanguage}>
            {language === "pt" ? "Pt" : null}
            {language === "en" ? "En" : null}
          </button>
        </div>

        <nav className="flex items-center">
          {windowWidth > 1024 ? <MenuLinks type="horizontal" closeMenu={() => {}} /> : null}
        </nav>
      </div>

      {windowWidth < 1024 ? <MenuMobile /> : null}

      {!isSongsOpen ? (
        <div className="py-10 px-6 md:px-0 md:grid md:grid-cols-12 h-[220px] md:h-[280px] lg:h-[360px]">
          <div className="font-coustard text-primary pt-8 text-4xl md:text-5xl md:col-start-4 md:col-end-12 md:gap-8 lg:pt-10 lg:text-6xl ">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.4,
              }}
            >
              <h1 className="mb-2 md:mb-4 lg:mb-8">yLLop</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.6,
              }}
            >
              <h1 className="mb-1 md:mb-3 lg:mb-7">Music &</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.8,
              }}
            >
              <h1 className="mb-1 md:mb-3 lg:mb-7">Sound Design</h1>
            </motion.div>
            {/* <AnimationWords /> */}
          </div>
        </div>
      ) : null}

      {isSongsOpen ? <div className="py-10"></div> : null}
    </>
  );
};

export default Header;
