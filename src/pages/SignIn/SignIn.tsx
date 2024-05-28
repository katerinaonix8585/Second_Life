import LoginForm from "components/LoginForm/LoginForm.tsx";
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
          <ButtonWrapper>
            <Button type="submit" background="#EE4266" name="Sign up" />
          </ButtonWrapper>
        </PartPageWrapper>
      </SignUpFormWrapper>
    </LoginPageWrapper>
  );
}

export default SignIn;
