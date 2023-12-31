import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const location = useLocation();
  const [isSongsOpen, setIsSongsOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/songs") {
      setIsSongsOpen(true);
    } else {
      setIsSongsOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div className={`bg-dark flex justify-between px-16 py-4 ${isSongsOpen ? "" : "fixed w-full z-20"}`}>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `font-coustard text-primary text-4xl ${isActive ? "duration-200" : "hover:text-[#fcc46a] duration-200]"}`
          }
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          LL
        </NavLink>
        <nav className="flex items-center">
          <ul className="flex gap-6 text-white text-xl">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "text-primary duration-200" : "hover:text-[#fcc46a] duration-200"
                }
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Home
              </NavLink>
            </li>
            {!isSongsOpen ? (
              <>
                <li>
                  <ScrollLink
                    to="work"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={1000}
                    className="cursor-pointer hover:text-[#fcc46a]"
                  >
                    Work
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={1000}
                    className="cursor-pointer hover:text-[#fcc46a]"
                  >
                    About
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={1000}
                    className="cursor-pointer hover:text-[#fcc46a]"
                  >
                    Contact
                  </ScrollLink>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
      </div>
      {!isSongsOpen ? (
        <div className="grid grid-cols-12 py-10">
          <div className="col-start-4 col-end-12 flex flex-col gap-8 text-6xl font-coustard text-primary pt-10">
            <h1>yLLop</h1>
            <h1>Music &</h1>
            <h1>Synthesis</h1>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
