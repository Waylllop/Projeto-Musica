import { slide as Menu } from "react-burger-menu";
import MenuLinks from "../MenuLinks";
import "./styles.css";
import { useState } from "react";

const MenuMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStateChange = (state: { isOpen: boolean }) => {
    setIsMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <Menu right width={200} isOpen={isMenuOpen} onStateChange={handleStateChange}>
      <MenuLinks type="vertical" closeMenu={closeMenu}/>
    </Menu>
  );
};

export default MenuMobile;
