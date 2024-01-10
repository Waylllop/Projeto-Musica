import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import MenuMobile from "./MenuMobile";
import MenuLinks from "./MenuLinks";

const Header = () => {
  const location = useLocation();
  const [isSongsOpen, setIsSongsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    // Adiciona um ouvinte de evento de redimensionamento da janela
    window.addEventListener("resize", handleResize);

    // Remove o ouvinte de evento quando o componente é desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="bg-dark flex justify-between px-0 py-4 fixed w-full z-20 lg:pr-32 lg:pl-16">
        <NavLink
          to="/home"
          className="font-coustard text-primary text-3xl px-6 md:px-0 lg:hover:text-[#fcc46a] lg:text-4xl lg:duration-200"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          LL
        </NavLink>

        <nav className="flex items-center">
          {windowWidth > 1024 ? <MenuLinks type="horizontal" closeMenu={() => {}} /> : null}
        </nav>
      </div>

      {windowWidth < 1024 ? <MenuMobile /> : null}

      {!isSongsOpen ? (
        <div className="py-10 px-6 md:px-0 md:grid md:grid-cols-12">
          <div className=" flex flex-col gap-4 font-coustard text-primary pt-8 text-4xl md:text-5xl md:col-start-4 md:col-end-12 md:gap-8 lg:pt-10 lg:text-6xl ">
            <h1>yLLop</h1>
            <h1>Music &</h1>
            <h1>Synthesis</h1>
          </div>
        </div>
      ) : null}
      {isSongsOpen ? <div className="py-10"></div> : null}
    </>
  );
};

export default Header;
