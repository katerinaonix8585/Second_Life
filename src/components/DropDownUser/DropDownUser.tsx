import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HeaderUser } from "pages/Layout/styles";

import {
  MenuContainer,
  MenuButton,
  MenuList,
  MenuItem as StyledMenuItem,
  NavLinkWithoutUnderline,
} from "./styles";

const DropDownUser: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (to: string) => {
    navigate(to);
    setIsOpen(false);
  };

  const userId = localStorage.getItem("userId");

  const menuItems = [
    { to: "/offers", value: "Create new offer" },
    { to: `/offers/users/userId=${userId}`, value: "My creator offers" },
    {
      to: `/offers/participations/users/userId=${userId}`,
      value: "My participant offers",
    },
    { to: "/aboutMe", value: "Personal information" },
  ];

  return (
    <MenuContainer onMouseLeave={handleMouseLeave} ref={menuRef} tabIndex={0}>
      <MenuButton
        onMouseEnter={handleMouseEnter}
        onClick={handleMenuButtonClick}
      >
        <HeaderUser />
      </MenuButton>
      {isOpen && (
        <MenuList>
          {menuItems.map((item, index) => (
            <div key={index} onClick={() => handleMenuItemClick(item.to)}>
              <NavLinkWithoutUnderline to={item.to}>
                <StyledMenuItem>{item.value}</StyledMenuItem>
              </NavLinkWithoutUnderline>
            </div>
          ))}
        </MenuList>
      )}
    </MenuContainer>
  );
};

export default DropDownUser;
