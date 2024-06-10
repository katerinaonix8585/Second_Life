import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

import { StyledNavLinkProps } from "./types";

export const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const MenuButton = styled.div`
  cursor: pointer;
`;

export const MenuList = styled.ul`
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: #f0f0f0;
  /* border: 1px solid #ccc; */
  border-radius: 10px;
  color: #56119c !important;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 270px;
  font-size: 15px;
  font-weight: bold;
  font-family: "DM Sans", sans-serif;
`;

export const MenuItem = styled.li`
  padding: 10px 14px;
  cursor: pointer;
  &:hover {
    background-color: #cdc5c2;
  }
  margin-top: 5px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  background-color: #e5e4e2;
`;

export const StyledNavLink = styled(NavLink)<StyledNavLinkProps>`
  text-decoration: ${(props: StyledNavLinkProps) =>
    props.isActive ? "underline" : "none"};
  font-size: 18px;
  color: black;
  font-weight: bold;
  font-family: "DM Sans", sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;

export const NavLinkWithoutUnderline = styled(NavLink)`
  text-decoration: none;
`;
