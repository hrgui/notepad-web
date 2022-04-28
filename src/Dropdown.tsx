import MenuItem from "./MenuItem";

type DropdownProps = {
  submenus: any[];
  dropdown: boolean;
  depthLevel: number;
  onRequestClose?: () => void;
};

const Dropdown = ({ submenus, dropdown, depthLevel, onRequestClose }: DropdownProps) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <MenuItem
          items={submenu}
          key={index}
          depthLevel={depthLevel}
          onRequestClose={onRequestClose}
        />
      ))}
    </ul>
  );
};

export default Dropdown;
