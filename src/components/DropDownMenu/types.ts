export type MenuItems = { id: number; value: string; to: string };

export interface DropDownMenuProps {
  items: MenuItems[];
  label: string;
  link: string;
}

export interface StyledNavLinkProps {
  isActive: boolean;
}
