import React, { useState } from "react";

import { StyledNavLink } from "./styles";

const DropDownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <StyledNavLink
        style={({ isActive }) => ({
          textDecoration: isActive ? "underline" : "none",
        })}
        to="/category"
      >
        Category
      </StyledNavLink>
      {isOpen && (
        <div>
          {
            <>
              <StyledNavLink to="/category1">Категория 1</StyledNavLink>
              <StyledNavLink to="/category2">Категория 2</StyledNavLink>
              <StyledNavLink to="/category3">Категория 3</StyledNavLink>
            </>
          }
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
