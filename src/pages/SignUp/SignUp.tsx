import { Link } from "react-router-dom";

import RegistrationForm from "components/RegistrationForm/RegistrationForm";
import Button from "components/Button/Button";

import {
  ButtonWrapper,
  LoginPageWrapper,
  PartPageContainerLeft,
  PartPageContainerRight,
  PartPageWrapper,
  SignInFormWrapper,
  SignUpFormName,
  SignUpFormWrapper,
  SignUpText,
  SignUpTextWrapper,
} from "./styles";

function SignUp() {
  return (
    <LoginPageWrapper>
      <SignInFormWrapper>
        <PartPageContainerLeft>
          <PartPageWrapper>
            <RegistrationForm />
          </PartPageWrapper>
        </PartPageContainerLeft>
      </SignInFormWrapper>
      <SignUpFormWrapper>
        <PartPageContainerRight>
          <PartPageWrapper>
            <SignUpFormName>Welcome Back!</SignUpFormName>
            <SignUpTextWrapper>
              <SignUpText>To keep connected with us please</SignUpText>
              <SignUpText>log in with your personal info</SignUpText>
            </SignUpTextWrapper>
            <Link to="/auth/user/login" style={{ textDecoration: "none" }}>
              <ButtonWrapper>
                <Button type="button" background="#EE4266" name="Sign in" />
              </ButtonWrapper>
            </Link>
          </PartPageWrapper>
        </PartPageContainerRight>
      </SignUpFormWrapper>
    </LoginPageWrapper>
  );
}

export default SignUp;
