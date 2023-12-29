import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-stone-800 mb-4 fixed w-full flex justify-between px-4">
      <nav className="flex items-center pl-2">
        <ul className="flex gap-6 text-white text-lg">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "text-orange-500 duration-200" : "hover:text-orange-300 duration-200"
              }
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
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-orange-500 duration-200" : "hover:text-orange-300 duration-200"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-orange-500 duration-200" : "hover:text-orange-300 duration-200"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <NavLink to="/home">
        <img className="w-40" src="https://waylllop.github.io/MusicasMp3/identidade-visual/logo-oranje.png" alt="" />
      </NavLink>
    </div>
  );
};

export default Header;
