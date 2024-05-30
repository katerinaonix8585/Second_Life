import { Link } from "react-router-dom";

import { LayoutProps } from "./types";
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

function AdminLayout({ children }: LayoutProps) {
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
      <Main>{children}</Main>
    </LayoutWrapper>
  );
}

export default AdminLayout;
