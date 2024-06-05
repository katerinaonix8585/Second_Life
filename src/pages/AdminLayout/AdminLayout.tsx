import { Link, Outlet } from "react-router-dom";

import {
  LayoutWrapper,
  Container,
  Header,
  HeaderTitleContainer,
  Main,
  HeaderTitle,
  HeaderLogoContainer,
  HeaderLogo,
  IconsContainer,
  HeaderLoginContainer,
  HeaderLogin,
  UpHeaderWrapper,
} from "./styles";

const AdminLayout: React.FC = () => {
  return (
    <LayoutWrapper>
      <Header>
        <Container>
          <UpHeaderWrapper>
            <HeaderTitleContainer>
              <HeaderLogoContainer>
                <HeaderLogo />
              </HeaderLogoContainer>
              <HeaderTitle>SECOND LIFE</HeaderTitle>
            </HeaderTitleContainer>
            <IconsContainer>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <HeaderLoginContainer>
                  <HeaderLogin />
                </HeaderLoginContainer>
              </Link>
            </IconsContainer>
          </UpHeaderWrapper>
        </Container>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </LayoutWrapper>
  );
};

export default AdminLayout;
