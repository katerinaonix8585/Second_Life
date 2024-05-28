import {
  ButtonWrapper,
  LoginPageWrapper,
  PartPageWrapper,
  SignInFormWrapper,
  SignUpFormName,
  SignUpFormWrapper,
  SignUpText,
  SignUpTextWrapper,
} from "./styles";
import Button from "components/Button/Button";
import LoginForm from "components/LoginForm/LoginForm";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <LoginPageWrapper>
      <SignInFormWrapper>
        <PartPageWrapper>
          <LoginForm />
        </PartPageWrapper>
      </SignInFormWrapper>
      <SignUpFormWrapper>
        <PartPageWrapper>
          <SignUpFormName>New Here?</SignUpFormName>
          <SignUpTextWrapper>
            <SignUpText>
              Join our community and unlock a world of possibilities.
            </SignUpText>
            <SignUpText>
              Create your account now and dive into a realm of exciting
            </SignUpText>
            <SignUpText>opportunities!</SignUpText>
          </SignUpTextWrapper>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <ButtonWrapper>
              <Button type="button" background="#EE4266" name="Sign up" />
            </ButtonWrapper>
          </Link>
        </PartPageWrapper>
      </SignUpFormWrapper>
    </LoginPageWrapper>
  );
}

export default SignIn;