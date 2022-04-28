import { useState, useEffect, useRef } from "react";

import Dropdown from "./Dropdown";
import { MenuItemDef } from "./menu";

type MenuItemsProps = {
  items: MenuItemDef;
  depthLevel: number;
  onRequestClose?: () => void;
};

const MenuItem = ({ items, depthLevel, onRequestClose }: MenuItemsProps) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef<any>();

  useEffect(() => {
    const handler = (event: any) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  return (
    <li className="menu-items" ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title} {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            onRequestClose={() => setDropdown(false)}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <button
          type="button"
          onClick={() => {
            items.action?.();
            onRequestClose?.();
          }}
        >
          {items.title}
        </button>
      )}
    </li>
  );
};

export default MenuItem;
