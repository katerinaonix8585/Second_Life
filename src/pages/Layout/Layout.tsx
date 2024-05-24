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
  Footer,  
  InfoContainer,
  InfoContainerText,
  InfoContainerWrapper,
  MailContainer,
  MailContainerText,
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
      </Footer>

    </LayoutWrapper>
  )
}

export default Layout;
