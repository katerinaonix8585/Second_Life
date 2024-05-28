import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { LayoutProps } from "./types";
import {
  LayoutWrapper,
  Container,
  Header,
  HeaderTitleContainer,
  NavContainer,
  Main,
  StyledNavLink,
  HeaderTitle,
  HeaderLogoContainer,
  HeaderLogo,
  IconsContainer,
  HeaderUserContainer,
  HeaderUser,
  HeaderLoginContainer,
  HeaderLogin,
  UpHeaderWrapper,
  DownWrapper,
  Footer,
  InfoContainer,
  InfoContainerText,
  InfoContainerWrapper,
  MailContainer,
  MailContainerText,
  SearchInput,
  SearchWrapper,
  SearchButton,
  FooterWrapper,
} from "./styles";

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();

  const goToHomePage = () => navigate("/");

  return (
    <LayoutWrapper>
      <Header>
        <Container>
          <UpHeaderWrapper>
            <HeaderTitleContainer onClick={goToHomePage}>
              <HeaderLogoContainer>
                <HeaderLogo />
              </HeaderLogoContainer>
              <HeaderTitle>SECOND LIFE</HeaderTitle>
            </HeaderTitleContainer>

            <SearchWrapper>
              <SearchInput placeholder="Search..." />
              <SearchButton>
                <FaSearch />
              </SearchButton>
            </SearchWrapper>

            <IconsContainer>
              <HeaderUserContainer>
                {/* TO DO Нужно добавить для этого элемента отображение только для авторизованных пользователей */}
                <HeaderUser />
              </HeaderUserContainer>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                 <HeaderLoginContainer>
                 <HeaderLogin />
                 </HeaderLoginContainer>
              </Link>           
            </IconsContainer>
          </UpHeaderWrapper>
        </Container>
        <DownWrapper>
          <Container>
            <NavContainer>
              <StyledNavLink
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                to="/"
              >
                Home
              </StyledNavLink>

              <StyledNavLink
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                to="/category"
              >
                Category
              </StyledNavLink>

              <StyledNavLink
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                to="/offers"
              >
                Offers
              </StyledNavLink>

              <StyledNavLink
                style={({ isActive }) => ({
                  textDecoration: isActive ? "underline" : "none",
                })}
                to="/aboutUs"
              >
                About us
              </StyledNavLink>
            </NavContainer>
          </Container>
        </DownWrapper>
      </Header>
      <Main>{children}</Main>

      <Footer>
        <Container>
          <FooterWrapper>
            <InfoContainerWrapper>
              <InfoContainer>
                <InfoContainerText>
                  Give a second life to your belongings with SecondLife - your
                  best partner in buying and selling quality goods!
                </InfoContainerText>
              </InfoContainer>
            </InfoContainerWrapper>
            <InfoContainerWrapper>
              <MailContainer>
                <MailContainerText>+3 333-333-333</MailContainerText>
              </MailContainer>
              <MailContainer>
                <MailContainerText>example@gmail.com</MailContainerText>
              </MailContainer>
            </InfoContainerWrapper>
          </FooterWrapper>
        </Container>
      </Footer>
    </LayoutWrapper>
  );
}

export default Layout;
