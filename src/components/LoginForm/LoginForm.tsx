import Input from "components/Input/Input.tsx";
import Button from "components/Button/Button.tsx";
import {
  LoginFormComponent,
  LoginFormName,
  InputsContainer,
  ButtonWrapper,
} from "./styles.ts";
import { useFormik } from "formik";
import { LoginFormValues, LOGIN_FIELD_NAMES } from "./types.ts";
import * as Yup from "yup";

function LoginForm() {
  const shema = Yup.object().shape({
    [LOGIN_FIELD_NAMES.EMAIL]: Yup.string()
      .required("Field email required")
      .email("Field type email"),
    [LOGIN_FIELD_NAMES.PASSWORD]: Yup.number()
      .typeError("Password must be number")
      .required("Field password required")
      .max(10, "Max 10 symbols")
      .min(3, "Min 3 symbols"),
  });

  const formik = useFormik({
    initialValues: {
      [LOGIN_FIELD_NAMES.EMAIL]: "",
      [LOGIN_FIELD_NAMES.PASSWORD]: "",
    } as LoginFormValues,
    validationSchema: shema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: LoginFormValues) => {
      console.log("Form submitted with values: ", values);
    },
  });

  console.log("Formik state: ", formik);

  return (
    <LoginFormComponent onSubmit={(e) => { 
      e.preventDefault(); 
      console.log("Form submit event triggered"); 
      formik.handleSubmit(e);
    }}>
      <LoginFormName>Login to Your Account</LoginFormName>
      <InputsContainer>
        <Input
          name={LOGIN_FIELD_NAMES.EMAIL}
          placeholder="Enter your email"
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.EMAIL]}
          error={formik.errors[LOGIN_FIELD_NAMES.EMAIL]}
          onBlur={formik.handleBlur}
        />
        <Input
          name={LOGIN_FIELD_NAMES.PASSWORD}
          type="password"
          placeholder="Enter your password"
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.PASSWORD]}
          error={formik.errors[LOGIN_FIELD_NAMES.PASSWORD]}
          onBlur={formik.handleBlur}
        />
      </InputsContainer>
      <ButtonWrapper>
        <Button type="submit" name="Sign in" />
      </ButtonWrapper>      
    </LoginFormComponent>
  );
}

export default LoginForm;
