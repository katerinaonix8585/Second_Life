import { useNavigate } from "react-router-dom"
import { LayoutProps } from "./types"
import {
  LayoutWrapper,
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
  FooterNavContainer,
  Footer,
  StyledLink,
  FooterNavText,
  InfoContainer,
  InfoContainerText,
  InfoContainerWrapper,
  MailContainer,
  MailContainerText,
  SocialMediaContainer,
  SocialMedia,
  SearchInput,
  SearchWrapper,
  SearchButton,
  FooterWrapper
} from "./styles"
import { FaSearch } from 'react-icons/fa'


function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()
  
  const goToHomePage = () => navigate("/")

  return (
    
    <LayoutWrapper>
      
      <Header>
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
               <HeaderLoginContainer>
                  <HeaderLogin /> 
               </HeaderLoginContainer>
            </IconsContainer>
        </UpHeaderWrapper>

        <DownWrapper>
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
        </DownWrapper>
      
      </Header>

      <Main>{children}</Main>  

      <Footer>
        
        <FooterWrapper>
        <InfoContainerWrapper>
           <InfoContainer>
              <InfoContainerText>Give a second life to your belongings with SecondLife - your best partner in buying and selling quality goods!</InfoContainerText>            
           </InfoContainer>
           <MailContainer>
              <MailContainerText>example@gmail.com</MailContainerText>
           </MailContainer>
           <SocialMediaContainer>
               <SocialMedia />
           </SocialMediaContainer>            
        </InfoContainerWrapper>

        <FooterNavContainer>
          <FooterNavText>Menu</FooterNavText>  
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/categories">Category</StyledLink>
          <StyledLink to="/offers">Offers</StyledLink>
          <StyledLink to="/aboutUs">About us</StyledLink>
        </FooterNavContainer>

        </FooterWrapper>
      </Footer>

    </LayoutWrapper>
  )
}

export default Layout;
