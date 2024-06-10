import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DropDownMenuProps } from "./types";
import {
  MenuContainer,
  MenuButton,
  MenuList,
  MenuItem as StyledMenuItem,
  StyledNavLink,
} from "./styles";

const DropDownMenu: React.FC<DropDownMenuProps> = ({ items, label, link }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const isActive = location.pathname === link;

  const handleMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (to: string) => {
    navigate(to);
    setIsOpen(false);
  };

  return (
    <MenuContainer onMouseLeave={handleMouseLeave} ref={menuRef} tabIndex={0}>
      <MenuButton
        onMouseEnter={handleMouseEnter}
        onClick={handleMenuButtonClick}
      >
        <StyledNavLink to={link} isActive={isActive}>
          {label}
        </StyledNavLink>
      </MenuButton>
      {isOpen && (
        <MenuList>
          {items.map((item, index) => (
            <div key={index} onClick={() => handleMenuItemClick(item.to)}>
              <StyledNavLink to={item.to} isActive={isActive}>
                <StyledMenuItem>{item.value}</StyledMenuItem>
              </StyledNavLink>
            </div>
          ))}
        </MenuList>
      )}
    </MenuContainer>
  );
};

export default DropDownMenu;
