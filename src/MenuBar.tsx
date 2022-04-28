import { MenuItemDef } from "./menu";
import MenuItem from "./MenuItem";

type Props = {
  menuItems: MenuItemDef[];
};

const MenuBar = ({ menuItems }: Props) => {
  return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItem items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default MenuBar;
