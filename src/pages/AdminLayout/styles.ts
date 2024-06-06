import styled from "@emotion/styled";

import { Login, Logo, User } from "../../shared/assets/images";

// Стиль для всего слоя
export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Container = styled.div`
  max-width: 1270px;
  margin: 0 auto;
`;

// Стиль для headerа (header + nav)Ï
export const Header = styled.header`
  border-bottom: 7px solid white;
  background: linear-gradient(to right, #9796f0, #fde8ed);
`;

// Стиль для headerа
export const UpHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  gap: 30px;
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
  font-size: 36px;
  color: #56119c;
  font-family: "IndieFlowerRegular", sans-serif;
  font-style: italic;
`;

export const ButtonContainer = styled.div``;

// Основное содержимое
export const Main = styled.main`
  flex: 1;
`;

// Иконки логина и ЛК
export const IconsContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 400px;
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
export const HeaderUserContainer = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const HeaderUser = styled.img`
  width: auto;
  height: 100%;
`;

HeaderUser.defaultProps = { src: User };
