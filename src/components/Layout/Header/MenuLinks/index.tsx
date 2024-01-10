import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

interface MenuLinksProps {
  type: "vertical" | "horizontal";
}

const MenuLinks = ({ type }: MenuLinksProps) => {
  const location = useLocation();
  const [isSongsOpen, setIsSongsOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/work") {
      setIsSongsOpen(true);
    } else {
      setIsSongsOpen(false);
    }
  }, [location.pathname]);
  return (
    <ul className={`flex text-white text-xl ${type === "vertical" ? "flex-col gap-4" : "gap-6"}`}>
      <li>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "text-primary duration-200" : "text-light hover:text-[#fcc46a] duration-200"
          }
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/work"
          className={({ isActive }) =>
            isActive ? "text-primary duration-200" : "text-light hover:text-[#fcc46a] duration-200"
          }
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Work
        </NavLink>
      </li>
      {!isSongsOpen ? (
        <>
          <li>
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              offset={-100}
              duration={1000}
              className="text-light cursor-pointer hover:text-[#fcc46a]"
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
              className="text-light cursor-pointer hover:text-[#fcc46a]"
            >
              Contact
            </ScrollLink>
          </li>
        </>
      ) : null}
    </ul>
  );
};

export default MenuLinks;
