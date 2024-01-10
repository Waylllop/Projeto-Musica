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
      <div className={`bg-dark flex justify-between px-16 py-4 fixed w-[calc(100vw-80px)] z-20`}>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `font-coustard text-primary text-4xl ${isActive ? "duration-200" : "hover:text-[#fcc46a] duration-200]"}`
          }
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          LL
        </NavLink>

        <nav className="flex items-center">{windowWidth > 1024 ? <MenuLinks type="horizontal" /> : null}</nav>
      </div>

      {windowWidth < 1024 ? <MenuMobile /> : null}

      {!isSongsOpen ? (
        <div className="grid grid-cols-12 py-10">
          <div className="col-start-4 col-end-12 flex flex-col gap-8 text-6xl font-coustard text-primary pt-10">
            <h1>yLLop</h1>
            <h1>Music &</h1>
            <h1>Synthesis</h1>
          </div>
        </div>
      ) : null}
      {isSongsOpen ? <div className="grid grid-cols-12 py-10"></div> : null}
    </>
  );
};

export default Header;
