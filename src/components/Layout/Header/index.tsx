import { NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  return (
    <div className="bg-dark mb-4 fixed w-full flex justify-between px-16">
      <NavLink to="/home">
        <img
          className="w-[200px]"
          src="https://waylllop.github.io/MusicasMp3/identidade-visual/logo-oranje.png"
          alt="Logo Yllop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </NavLink>
      <nav className="flex items-center pl-2">
        <ul className="flex gap-6 text-white text-lg">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "text-orange-500 duration-200" : "hover:text-orange-300 duration-200"
              }
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/songs"
              className={({ isActive }) =>
                isActive ? "text-orange-500 duration-200" : "hover:text-orange-300 duration-200"
              }
            >
              Songs
            </NavLink>
          </li>
          <li>
            <ScrollLink
              to="work"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="cursor-pointer hover:text-orange-300"
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
              duration={500}
              className="cursor-pointer hover:text-orange-300"
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
              duration={500}
              className="cursor-pointer hover:text-orange-300"
            >
              Contact
            </ScrollLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
