import styled from "@emotion/styled";
import { NavLink, Link } from "react-router-dom";
import { login, logo, user, socialMedia } from "../../shared/assets/images";

// Стиль для всего слоя
export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;  
  flex: 1;  
  align-items: center;  
  background-size: cover;  
`;

// Стиль для headerа (header + nav)
export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
  background: linear-gradient(to right, #9796F0, #fde8ed);
`;

// Стиль для headerа
export const UpHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  width: 2200px;
  padding: 0px 250px 0px 250px;
  `;

// Логотип
export const HeaderLogoContainer = styled.div`
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

export const HeaderLogo = styled.img`
  width: 100%;
  height: 100%;
  src: url(logo);
`;

HeaderLogo.defaultProps = { src: logo };

// Название сайта
export const HeaderTitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  cursor: pointer;
  gap: 30px
`;

export const HeaderTitle = styled.h2`
color: white;
font-size: 36px;
font-weight: 700;
font-style: initial;
color: #56119C;
`;

// Область поиска
export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  /* padding: 10px; */
  border-radius: 25px;
  background-color: gainsboro;
`;


export const SearchInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 25px 0 0 25px;
  font-size: 16px;
  outline: none;

  &:focus {
    border: 1px solid #9796F0; 
  }
`;

export const SearchButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #9796F0;
  color: white;
  border-radius: 0 25px 25px 0;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1; 
`;

// Иконки логина и ЛК
export const IconsContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 400px;
  cursor: pointer;
  gap: 30px
`;

// Иконка логина
export const HeaderLoginContainer = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const HeaderLogin = styled.img`
  width: 100%;
  height: 100%;
`;

HeaderLogin.defaultProps = { src: login };

// Иконка user
export const HeaderUserContainer = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const HeaderUser = styled.img`
  width: 100%;
  height: 100%;
`;

HeaderUser.defaultProps = { src: user };

// Панель ссылок
export const DownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
  width: 100%;
  height: 40px;
  background-color: gainsboro; 
`;

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 2200px;
  gap: 50px;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  color: black;
`;


// Footer
export const Footer = styled.footer`
  display: flex;  
  flex-direction: row;
  justify-content: center;
  width: 100%;  
  margin-top: 40px;
  background: linear-gradient(to right, #dadcf7, #fde8ed);  
`;

export const FooterWrapper = styled.footer`
  display: flex;    
  width: 1800px; 
  padding: 20px;
  justify-content: space-between;   
  
`;

export const FooterNavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  
`;

export const FooterNavText = styled.p`
font-size: 20px;
font-weight: 700;
font-style: initial;
color: black;
text-decoration: underline;
`;

export const InfoContainerWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-around;
  gap: 20px;
`;

export const InfoContainer = styled.div`
  width: 400px;
`;

export const InfoContainerText = styled.p`
font-size: 18px;
font-weight: 600;
font-style: initial;
color: #56119C;
`;

export const MailContainer = styled.div`
  width: 400px;  
`;

export const MailContainerText = styled.p`
font-size: 14px;
font-weight: 700;
font-style: initial;
color: black;
`;

export const SocialMediaContainer = styled.div`
 width: 100px;
 cursor: pointer;
`;

export const SocialMedia = styled.img`
  width: 100%;
  
`;

SocialMedia.defaultProps = { src: socialMedia };





