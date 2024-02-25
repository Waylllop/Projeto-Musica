import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import useLanguage from "../../../../Hooks/UseLanguage";
import { Home, SectionAbout, SectionContact, Work } from "../../../../common/text";

interface MenuLinksProps {
  type: "vertical" | "horizontal";
  closeMenu: () => void;
}

const MenuLinks = ({ type, closeMenu }: MenuLinksProps) => {
  const location = useLocation();
  const [isSongsOpen, setIsSongsOpen] = useState(false);
  const { language } = useLanguage();

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
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            closeMenu();
          }}
        >
          {language === "en" ? Home.en : null}
          {language === "pt" ? Home.pt : null}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/work"
          className={({ isActive }) =>
            isActive ? "text-primary duration-200" : "text-light hover:text-[#fcc46a] duration-200"
          }
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            closeMenu();
          }}
        >
          {language === "en" ? Work.en : null}
          {language === "pt" ? Work.pt : null}
        </NavLink>
      </li>
      {!isSongsOpen ? (
        <>
          <li>
            <ScrollLink
              to="design"
              spy={true}
              smooth={true}
              offset={-100}
              duration={1000}
              className="text-light cursor-pointer hover:text-[#fcc46a]"
              onClick={() => closeMenu()}
            >
              Design
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              offset={-100}
              duration={1000}
              className="text-light cursor-pointer hover:text-[#fcc46a]"
              onClick={() => closeMenu()}
            >
              {language === "en" ? SectionAbout.en : null}
              {language === "pt" ? SectionAbout.pt : null}
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
              onClick={() => closeMenu()}
            >
              {language === "en" ? SectionContact.en : null}
              {language === "pt" ? SectionContact.pt : null}
            </ScrollLink>
          </li>
        </>
      ) : null}
    </ul>
  );
};

export default MenuLinks;
