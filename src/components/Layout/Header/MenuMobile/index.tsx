import { slide as Menu } from "react-burger-menu";
import MenuLinks from "../MenuLinks";
import "./styles.css";

const MenuMobile = () => {
  return (
    <Menu right width={200}>
      <MenuLinks type="vertical" />
    </Menu>
  );
};

export default MenuMobile;
