import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

import { Login, Logo, User } from "../../../src/assets/images";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Container = styled.div`
  max-width: 1270px;
  margin: 0 auto;
`;

// Стиль для headerа (header + nav)
export const Header = styled.header`
  background: linear-gradient(to right, #9796f0, #fde8ed);
`;

// Стиль для headerа
export const UpHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  gap: 30px;
`;

// Логотип
export const HeaderLogoContainer = styled.div`
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

export const HeaderLogo = styled.img`
  width: auto;
  height: 100%;
`;

HeaderLogo.defaultProps = { src: Logo };

// Название сайта
export const HeaderTitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  cursor: pointer;
  gap: 30px;
`;

export const HeaderTitle = styled.h2`
  font-size: 30px;
  color: #56119c;
  font-family: "LXGW WenKai TC", cursive;
`;

export const SearchSelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
  border-radius: 25px;
  gap: 30px;
  height: 40px;
  /* background-color: gainsboro; */
`;

// Область поиска
export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 40px;
  margin: 0 auto;
  border-radius: 25px;
  margin-top: 10px;
  /* background-color: gainsboro; */
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  border-radius: 25px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 20px 0 0 20px;
  font-size: 16px;
  outline: none;
  height: 40px;

  &:focus {
    border: 1px solid #9796f0;
  }
`;

export const SearchButton = styled.button`
  padding: 10px;
  border: none;
  height: 40px;
  background-color: #9796f0;
  color: white;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #6a67ce;
  }
`;

// Основное содержимое
export const Main = styled.main`
  flex: 1;
`;

// Иконки логина и ЛК
export const IconsContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  gap: 30px;
`;

// Иконка логина
export const HeaderLoginContainer = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const HeaderLogin = styled.img`
  width: auto;
  height: 100%;
`;

HeaderLogin.defaultProps = { src: Login };

// Иконка user
export const HeaderUserContainer = styled.div<{ isActive: boolean }>`
  width: 40px;
  height: 40px;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "default")};
`;

export const HeaderUser = styled.img`
  width: auto;
  height: 100%;
`;

HeaderUser.defaultProps = { src: User };

// Панель ссылок
export const DownWrapper = styled.div`
  background-color: #e5e4e2;
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  padding: 10px;
  align-items: center;
`;

export const StyledNavLink = styled(NavLink)<{ isActive: boolean }>`
  text-decoration: ${({ isActive }) => (isActive ? "underline" : "none")};
  font-size: 18px;
  color: black;
  font-weight: bold;
  font-family: "DM Sans", sans-serif;

  &:hover {
    text-decoration: underline;
  }
`;

// Footer
export const Footer = styled.footer`
  width: auto;
  background: linear-gradient(to right, #dadcf7, #fde8ed);
`;

export const FooterWrapper = styled.footer`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

export const InfoContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
`;

export const InfoContainer = styled.div`
  width: auto;
`;

export const InfoContainerText = styled.p`
  font-size: 18px;
  color: #56119c;
  font-weight: bold;
  font-family: "LXGW WenKai TC", cursive;
`;

export const MailContainer = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
`;

export const MailContainerText = styled.p`
  font-size: 16px;
  font-weight: bold;
  font-family: "DM Sans", sans-serif;
  color: black;
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }
`;
