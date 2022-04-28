export type MenuItemDef = {
  submenu?: MenuItemDef[];
  title: string;
  action?: () => void;
};
