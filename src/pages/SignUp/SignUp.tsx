import RegistrationForm from "components/RegistrationForm/RegistrationForm";
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
import { Link } from "react-router-dom";

function SignUp() {

  return (
    <LoginPageWrapper>
      <SignInFormWrapper onClick={(e) => e.preventDefault()}>
        <PartPageWrapper>
          <RegistrationForm />
        </PartPageWrapper>
      </SignInFormWrapper>
      <SignUpFormWrapper>
        <PartPageWrapper>
          <SignUpFormName>Welcome Back!</SignUpFormName>
          <SignUpTextWrapper>
            <SignUpText>
            To keep connected with us please
            </SignUpText>
            <SignUpText>
            log in with your personal info
            </SignUpText>            
          </SignUpTextWrapper>
          <Link to="/signin" style={{ textDecoration: "none" }}>
          <ButtonWrapper>
                 <Button type="button" background="#EE4266" name="Sign in" />
          </ButtonWrapper>
          </Link>    
        </PartPageWrapper>
      </SignUpFormWrapper>
    </LoginPageWrapper>
  );
}

export default SignUp;
