import LoginForm from "components/LoginForm/LoginForm";

import { LoginPageWrapper, PartPageWrapper, SignInFormWrapper } from "./styles";

function AdminSignIn() {
  return (
    <LoginPageWrapper>
      <SignInFormWrapper>
        <PartPageWrapper>
          <LoginForm />
        </PartPageWrapper>
      </SignInFormWrapper>
    </LoginPageWrapper>
  );
}

export default AdminSignIn;
